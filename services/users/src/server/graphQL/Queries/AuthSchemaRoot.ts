import { SchemaRoot, Query } from "@dadoudidou/typegql"
import Utilisateur from "../Types/Objects/Utilisateur";

@SchemaRoot()
export default class AuthSchemaRoot {
    
    @Query({
        description: "Authentifie un utilisateur et retourne un token si l'authentification réussie",
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
}