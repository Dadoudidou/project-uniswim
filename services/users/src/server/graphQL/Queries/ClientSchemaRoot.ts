import { SchemaRoot, Query, Context, ObjectType, Mutation, InputField, Field, Arg, After  } from "@dadoudidou/typegql"
import { GraphQLContext } from "@graphQL/*";
import Client from "../Types/Objects/Client";
import ClientInput from "../Types/Inputs/ClientInput";
import { GraphQLInt } from "graphql";
import { toObjectType } from "../Helpers/ToObjectType";


@SchemaRoot()
export default class ClientSchemaRoot {
    
    @Mutation({ type: Client, description: "Crée un nouveau client" })
    async createClient(data: ClientInput, @Context ctx: GraphQLContext): Promise<Client> {
        let _client = await ctx.models.Client.create({
            adresse: data.adresse,
            code_postal: data.code_postal,
            raison_sociale: data.raison_sociale,
            ville: data.ville
        });
        return toObjectType(Client, _client);
    }

    @Mutation({ type: Client, description: "Met à jour les informations d'un client" })
    async updateClient(id:number, data: ClientInput, @Context ctx: GraphQLContext): Promise<Client> {
        if(!id) throw new Error("id is not defined");
        return toObjectType(
            Client, 
            await ctx.models.Client.findById(id)
            .then(client => {
                if(!client) throw new Error(`Client with ${id} not found`);
                return client;
            })
            .then(client => {
                client.raison_sociale = data.raison_sociale;
                client.adresse = data.adresse;
                client.code_postal = data.code_postal;
                client.ville = data.ville;
                return client.save()
            }))
    }

    @Mutation({ type: Client, description: "Active ou désactive un client" })
    activateClient(id:number, data: Boolean, @Context ctx: GraphQLContext): Promise<Client> {
        if(!id) throw new Error("id is not defined");
        return null;
    }

    @Query({ type: Client , description: "Récupère les informations d'un client"})
    async getClient(id: number, @Context ctx: GraphQLContext): Promise<Client> {
        return toObjectType(
            Client, 
            await ctx.models.Client.findById(id)
            .then(client => {
                if(!client) throw new Error(`Client with ${id} not found`);
                return client;
            })
        )
    }

    
}


