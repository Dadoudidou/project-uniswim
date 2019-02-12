import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript"
import Application from "./Application";
import Role from "./Role";
import Abilite from "./Abilite";
import UtilisateurAbilite from "./UtilisateurAbilite";
import UtilisateurRole from "./UtilisateurRole";

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

