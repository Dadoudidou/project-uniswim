import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, PrimaryKey, Length, BeforeCreate, BeforeUpdate } from "sequelize-typescript"
import Application from "./Application";
import Role from "./Role";
import Abilite from "./Abilite";
import UtilisateurAbilite from "./UtilisateurAbilite";
import UtilisateurRole from "./UtilisateurRole";
import { CryptText } from "./../../utils/Crypt";
import Client from "./Client";

@Table
export default class Utilisateur extends Model<Utilisateur> {

    @Column
    revision_from: Date;

    @BeforeCreate
    static beforeCreateRevisionFrom(instance: Utilisateur){
        instance.revision_from = new Date();
    }
    /*@BeforeUpdate
    static beforeUpdateRevisionFrom(instance: Utilisateur){
        instance.revision_from = new Date();
    }*/

    @Column
    revision_until?: Date;

    @BeforeUpdate
    static beforeUpdateRevisionUntil(instance: Utilisateur){
        instance.revision_until = new Date();
    }

    @Column
    revision_status: string;

    @ForeignKey(() => Utilisateur)
    @Column
    revision_utilisateur_id: number;

    @ForeignKey(() => Client)
    @Column
    client_id: number;

    @Column
    login: string;

    @Length({max:255})
    @Column
    password: string;

    /*@BeforeCreate
    static async hashPassword(instance: Utilisateur){
        let textCrypted = await CryptText(instance.password);
        instance.password = textCrypted;
    }*/

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

