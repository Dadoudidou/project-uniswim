import { ObjectType, Field, Context } from "@dadoudidou/typegql";
import { GQLScalarJSON } from "./../Scalars/JSON"
import { RawRule } from "@casl/ability";
import { GraphQLContext } from "@graphQL/*";

@ObjectType()
export default class Utilisateur {
    @Field()
    id: number

    @Field()
    login: string

    @Field()
    nom: string

    @Field()
    prenom: string

    @Field()
    email: string

    @Field({ type: GQLScalarJSON })
    rawRules(@Context ctx: GraphQLContext): any{
        if(!ctx.user) return [];
        if(!ctx.user.ability) return [];
        return ctx.user.ability.rules;
    }
}

