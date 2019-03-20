import {} from "sequelize-typescript"
import Utilisateur from "../models/Utilisateur";
import database from "@database/*";
import Client from "../models/Client";
import { GetClient } from "./ClientRepo";
import { CryptText } from "./../../utils/Crypt";
import { FilteredModelAttributes } from "sequelize-typescript/lib/models/Model";


type GetUtilisateurFromClient_Search = {
    id?: number, 
    email?: string
}
export const GetUtilisateurFromClient = async (client: Client, search: GetUtilisateurFromClient_Search): Promise<Utilisateur> => {
    if(!search.id && !search.email){
        throw new Error("Don't have search parameter to search user");
    }
    let _where = {  }
    if(search.id) _where = { ..._where, id: search.id };
    if(search.email) _where = { ..._where, email: search.email };
    let _tests: any[] = await client.$get("utilisateurs", {
        where: { ..._where, revision_until: null }
    });
    let user = undefined;
    if(_tests.length > 0) user = _tests[0];

    return user;
}

export const CreateUtilisateur = async (client_id: number, utilisateur: FilteredModelAttributes<Utilisateur>): Promise<Utilisateur> => {

    // user exist ?
    let client = await GetClient(client_id);
    if(!client) throw new Error(`Client with id '${client_id}' not found`);
    let _user = await GetUtilisateurFromClient(client, { email: utilisateur.email });
    if(_user) throw new Error(`User already exist with email ${utilisateur.email}`);

    utilisateur.password = await CryptText(utilisateur.password);

    let _nuser = await client.$create("utilisateur", utilisateur) as any;

    return _nuser;
}

export const UpdateUtilisateur = async (client_id: number, user_id: number, utilisateur: FilteredModelAttributes<Utilisateur>): Promise<Utilisateur> => {
    let client = await GetClient(client_id);
    if(!client) throw new Error(`Client with id '${client_id}' not found`);
    let _user = await GetUtilisateurFromClient(client, { id: user_id });
    if(!_user) throw new Error(`User not exist with id '${user_id}'`);

    // -- mise à jour des données utilisateurs
    let _tableName = database.models.Utilisateur.getTableName() as string;
    
    await database.bdd.query(`UPDATE ${_tableName} set revision_until='${(new Date()).toISOString().slice(0,19).replace("T", " ")}' where id=${_user.id} and revision_until is null`);

    // -- ajout d'une nouvelle ligne
    let __user = _user.get({ plain: true });
    for(let key in utilisateur) if((utilisateur as any)[key] !== undefined) __user[key] = (utilisateur as any)[key];
    let _nuser = await database.models.Utilisateur.create({
        ...__user,
        revision_until: null
    }) as any;

    return _nuser;
}