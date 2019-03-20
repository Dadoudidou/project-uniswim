import { ObjectType, Field, InputObjectType, InputField } from "@dadoudidou/typegql";

@ObjectType()
export default class Abilite {

    @Field()
    id: number

    @Field()
    nom: string;

    @Field()
    description: string;

    @Field()
    actions: string;

    @Field()
    sujets: string;

    @Field()
    conditions: string;
}