import { Before } from "@dadoudidou/typegql";
import { GraphQLContext } from "@graphQL/*";
import { AuthenticationError } from "apollo-server-core";

export const AuthenticatedHook = () => {
    return Before(({ context }) => {
        if(!(context as GraphQLContext).user){
            throw new AuthenticationError("Vous n'êtes pas autorisé à accèder à ces informations");
        }
    })
}