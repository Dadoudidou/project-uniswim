import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, Length } from "sequelize-typescript"
import Application from "./Application";
import Role from "./Role";
import RoleAbilite from "./RoleAbilite";

@Table
export default class Abilite extends Model<Abilite> {

    @ForeignKey(() => Application)
    @Column
    application_id: number;

    @Length({ max: 45 })
    @Column
    nom: string;

    @Column(DataType.TEXT)
    description: string;

    @Length({ max: 45 })
    @Column
    actions: string;

    @Length({ max: 45 })
    @Column
    sujets: string;

    @Column(DataType.TEXT)
    conditions: string;

    @BelongsTo(() => Application)
    application: Application

    @BelongsToMany(() => Role, () => RoleAbilite)
    roles: Role[]
}
