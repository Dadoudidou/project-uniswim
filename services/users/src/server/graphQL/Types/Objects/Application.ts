import { ObjectType, Field, InputObjectType, InputField } from "@dadoudidou/typegql";

@ObjectType()
export default class Application {

    @Field()
    id: number

    @Field()
    nom: string;
}

