import { SchemaRoot, Query, Context, ObjectType, Mutation, InputField, Field, Arg, After  } from "@dadoudidou/typegql"
import { GraphQLContext } from "@graphQL/*";
import { toObjectType } from "../Helpers/ToObjectType";
import Application from "../Types/Objects/Application";
import ApplicationInput from "../Types/Inputs/ApplicationInput";


@SchemaRoot()
export default class ApplicationSchemaRoot {
    
    @Mutation({ type: Application, description: "Crée une nouvelle application" })
    async createApplication(data: ApplicationInput, @Context ctx: GraphQLContext): Promise<Application> {
        return toObjectType(
            Application, 
            await ctx.models.Application.create({ nom: data.nom })
        );
    }

    @Mutation({ type: Application, description: "Met à jour les informations d'une application" })
    async updateApplication(id:number, data: ApplicationInput, @Context ctx: GraphQLContext): Promise<Application> {
        if(!id) throw new Error("id is not defined");
        return toObjectType(
            Application, 
            await ctx.models.Application.findById(id)
            .then(application => {
                if(!application) throw new Error(`Application with ${id} not found`);
                return application;
            })
            .then(application => {
                application.nom = data.nom;
                return application.save()
            }))
    }

    @Mutation({ type: Application, description: "Active ou désactive une application" })
    activateApplication(id:number, data: Boolean, @Context ctx: GraphQLContext): Promise<Application> {
        if(!id) throw new Error("id is not defined");
        return null;
    }

    @Query({ type: Application , description: "Récupère les informations d'une application"})
    async getApplication(id: number, @Context ctx: GraphQLContext): Promise<Application> {
        return toObjectType(
            Application, 
            await ctx.models.Application.findById(id)
            .then(application => {
                if(!application) throw new Error(`Application with ${id} not found`);
                return application;
            })
        )
    }

    
}


