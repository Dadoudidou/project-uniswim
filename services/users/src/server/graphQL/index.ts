import { compileSchema } from "@dadoudidou/typegql";
import AuthSchemaRoot from "./SchemaRoots/AuthSchemaRoot";
import database from "@database/*";
import ClientSchemaRoot from "./SchemaRoots/ClientSchemaRoot";
import ApplicationSchemaRoot from "./SchemaRoots/ApplicationSchemaRoot";
import ServerSchemaRoot from "./SchemaRoots/ServerSchemaRoot";


export type GraphQLContext = {
    models: typeof database.models
    repos: typeof database.repos
}

// https://github.com/prismake/typegql

const finalSchema = compileSchema({
    roots: [
        AuthSchemaRoot,
        ClientSchemaRoot,
        ApplicationSchemaRoot,
        ServerSchemaRoot
    ]
});

export default () => finalSchema