import { Table, Model, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

@Table
export class Player extends Model<Player> {

  @Column
  name: string;

  @Column
  num: number;
  
  @ForeignKey(() => Team)
  @Column
  teamId: number;
  
  @BelongsTo(() => Team)
  team: Team;
}

@Table
export class Team extends Model<Team> {

  @Column
  name: string;

  @HasMany(() => Player)
  players: Player[];
}