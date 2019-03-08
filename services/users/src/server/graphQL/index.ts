import { compileSchema } from "@dadoudidou/typegql";
import AuthSchemaRoot from "./Queries/AuthSchemaRoot";
import database from "@database/*";
import ClientSchemaRoot from "./Queries/ClientSchemaRoot";
import ApplicationSchemaRoot from "./Queries/ApplicationChemaRoot";


export type GraphQLContext = {
    models: typeof database.models
}

// https://github.com/prismake/typegql

const finalSchema = compileSchema({
    roots: [
        AuthSchemaRoot,
        ClientSchemaRoot,
        ApplicationSchemaRoot
    ]
});

export default () => finalSchema