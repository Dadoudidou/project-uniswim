import {} from "sequelize-typescript"
import Utilisateur from "../models/Utilisateur";
import database from "@database/*";
import Client from "../models/Client";
import { GetClient } from "./ClientRepo";
import { CryptText, CheckCryptText } from "./../../utils/Crypt";
import { FilteredModelAttributes } from "sequelize-typescript/lib/models/Model";


type GetUtilisateurOptions = {
    id?: number, 
    email?: string,
    client_id?: number
    [key: string]: any
}
export const GetUtilisateurs = async (search: GetUtilisateurOptions): Promise<Utilisateur[]> => {
    // -- test des paramètres
    if(!search) throw new Error("Don't have search parameter to search user");
    let _paramsOks = false;
    for(let key in search) if(search[key] != undefined && search[key] != null) _paramsOks = true;
    if(!_paramsOks) throw new Error("Don't have search parameter to search user");

    // -- composition de la requete
    let _where = {};
    let _include: any[] = [];

    if(search.id) _where = { ..._where, id: search.id };
    if(search.email) _where = { ..._where, email: search.email };
    if(search.client_id) _include = [ ..._include, { model: Client, where: { id: search.client_id } } ]
    let users: Utilisateur[] = await database.models.Utilisateur.findAll({
        where: { ..._where, revision_until: null },
        include: _include
    });
    return users;
}

export const CreateUtilisateur = async (client_id: number, utilisateur: FilteredModelAttributes<Utilisateur>): Promise<Utilisateur> => {

    // user exist ?
    let client = await GetClient(client_id);
    if(!client) throw new Error(`Client with id '${client_id}' not found`);
    let _users = await GetUtilisateurs({ email: utilisateur.email, client_id: client_id });
    if(_users.length > 0) throw new Error(`User already exist with email ${utilisateur.email}`);

    utilisateur.password = await CryptText(utilisateur.password);

    let _nuser = await client.$create("utilisateur", utilisateur) as any;

    return _nuser;
}

export const UpdateUtilisateur = async (client_id: number, user_id: number, utilisateur: FilteredModelAttributes<Utilisateur>): Promise<Utilisateur> => {
    let client = await GetClient(client_id);
    if(!client) throw new Error(`Client with id '${client_id}' not found`);
    let _users = await GetUtilisateurs({ id: user_id, client_id: client_id });
    if(_users.length == 0) throw new Error(`User not exist with id '${user_id}'`);
    let _user = _users[0];

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

export const CheckUtitlisateur = async (email: string, password: string): Promise<Utilisateur> => {

    let _users = await GetUtilisateurs({ email });
    if(_users.length == 0) return null;


    // -- check password
    for(let i=0; i<_users.length; i++){
        let _passwordIsGood = await CheckCryptText(_users[i].password, password);
        if(_passwordIsGood) return _users[i];
    }

    return null;
}