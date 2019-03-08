import * as Express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import config from "@config/*";
import graphQL from "./graphQL";
import logs from "@logs/*";
import LogErrors from "./middlewares/LogErrors";
import ClientErrorHandler from "./middlewares/ClientErrorHandler";
import ErrorHandler from "./middlewares/ErrorHandler";
import LogHttpRequest from "./middlewares/LogHttpRequest";
import * as Helmet from "helmet"
import database from "@database/*";


const TypeDefs = gql`
    type Client {
        id: Int
        adresse: String
    }
    input ClientInput {
        adresse: String
    }
    type Query {
        test: String
    }
    type Mutation {
        client(data: ClientInput): Client
    }
`;

const Resolvers = {
    Query: {
        test: () => ""
    },
    Mutation: {
        client: async (data: any) => {
            let _client = await database.models.Client.create({
                adresse: "test"
            });
            return _client;
        }
    }
}


async function createServer(){
    // -- express Server
    const app = Express();

    // -- configuration
    app.set("port", config.server.port);

    // -- express logging
    app.use(LogHttpRequest)

    // -- securite des entetes
    app.use(Helmet())
    app.disable("x-powered-by");

    // -- express errors
    app.use(LogErrors);
    app.use(ClientErrorHandler);
    app.use(ErrorHandler);

    // -- graphql Server
    const graphQlServer = new ApolloServer({
        schema: graphQL(),
        //typeDefs: TypeDefs,
        //resolvers: Resolvers,
        debug: true,
        uploads: true,
        context: (ExpressCtx) => ({
            log: logs.logGraphQl,
            models: database.models,
            database: database.bdd
        })
    });
    graphQlServer.applyMiddleware({
        app: app,
        path: "/api/graphql"
    });

    // -- ecoute du port
    app.listen(app.get("port"), () => {
        logs.logExpress.info(`Server listening on port ${app.get('port')}`);
    });

    return app;
}

export default createServer;