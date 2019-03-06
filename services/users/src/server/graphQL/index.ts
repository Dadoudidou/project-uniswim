import { compileSchema } from "@dadoudidou/typegql";
import AuthSchemaRoot from "./Queries/AuthSchemaRoot";

// https://github.com/prismake/typegql

const finalSchema = compileSchema({
    roots: [
        AuthSchemaRoot
    ]
});

export default () => finalSchema