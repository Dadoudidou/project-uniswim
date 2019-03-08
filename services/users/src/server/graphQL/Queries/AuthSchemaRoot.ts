import { SchemaRoot, Query, Context, Mutation } from "@dadoudidou/typegql"
import Utilisateur from "../Types/Objects/Utilisateur";
import { GraphQLContext } from "@graphQL/*";

@SchemaRoot()
export default class AuthSchemaRoot {
    
    @Query({
        description: "Authentifie un utilisateur et retourne un token si l'authentification est réussie",
    })
    auth(username: string, password: string): string {
        return "";
    }

    @Query({
        description: "Récupère les informations de l'utilisateur à l'aide d'un token"
    })
    authToken(token: string): Utilisateur {
        return null;
    }

    @Mutation({
        description: "Enregistre un utilisateur et retourne un token si l'enregistrement est réussi"
    })
    register(username: string, password: string, @Context ctx: GraphQLContext): string {
        return "";
    }
}