import * as Express from "express"
import { ApolloServer } from "apollo-server-express"
import config from "@config/*";
import graphQL from "@graphQL/*";



async function createServer(){
    // -- express Server
    const app = Express();

    // -- configuration
    app.set("port", config.server.port);

    // -- graphql Server
    const graphQlServer = new ApolloServer({
        schema: graphQL(),
        debug: true,
        uploads: true
    });
    graphQlServer.applyMiddleware({
        app: app,
        path: "/api/graphql"
    });

    // -- ecoute du port
    app.listen(app.get("port"));

    return app;
}

export default createServer;