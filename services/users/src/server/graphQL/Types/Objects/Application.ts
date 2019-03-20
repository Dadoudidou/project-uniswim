import { ObjectType, Field, InputObjectType, InputField } from "@dadoudidou/typegql";
import { GQLScalarDate } from "./../Scalars/Date"

@ObjectType()
export default class Application {

    @Field()
    id: number

    @Field()
    nom: string;

    @Field({ type: GQLScalarDate })
    date_created_gmt: Date;
}

