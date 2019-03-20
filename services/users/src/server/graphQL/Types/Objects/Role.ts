import { ObjectType, Field, InputObjectType, InputField } from "@dadoudidou/typegql";

@ObjectType()
export default class Role {

    @Field()
    id: number

    @Field()
    nom: string;

    @Field()
    description: string;
}