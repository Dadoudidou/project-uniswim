import { ObjectType, Field, InputObjectType, InputField } from "@dadoudidou/typegql";

@ObjectType()
export default class Client {

    @Field()
    id: number

    @Field()
    raison_sociale: string;

    @Field()
    adresse: string;

    @Field()
    code_postal: string;

    @Field()
    ville: string;
}

