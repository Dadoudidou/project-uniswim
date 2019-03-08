import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, PrimaryKey, Length, BeforeCreate, BeforeUpdate } from "sequelize-typescript"
import Application from "./Application";
import Role from "./Role";
import Abilite from "./Abilite";
import UtilisateurAbilite from "./UtilisateurAbilite";
import UtilisateurRole from "./UtilisateurRole";
import { CryptText } from "./../../utils/Crypt";

@Table
export default class Utilisateur extends Model<Utilisateur> {

    @PrimaryKey
    @Column
    revision_from: Date;

    @Column
    revision_until?: Date;

    @Column
    revision_status: string;

    @ForeignKey(() => Utilisateur)
    @Column
    revision_utilisateur_id: number;

    @ForeignKey(() => Application)
    @Column
    client_id: number;

    @Column
    login: string;

    @Length({max:255})
    @Column
    password: string;

    @BeforeCreate
    static hashPassword(instance: Utilisateur){
        CryptText(instance.password)
        .then(textCrypted => instance.password = textCrypted)
        .catch(err => { if(err) console.error(err) })
    }

    @Column
    nom: string;

    @Column
    prenom: string;

    @Column
    email: string;

    @BelongsToMany(() => Abilite, () => UtilisateurAbilite)
    abilites: Abilite[]

    @BelongsToMany(() => Role, () => UtilisateurRole)
    roles: Role[]
}

