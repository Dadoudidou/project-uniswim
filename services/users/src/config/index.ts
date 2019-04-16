import * as nconf from "nconf"
import { SequelizeConfig } from "sequelize-typescript/lib/types/SequelizeConfig";

// -- met les variables du fichier .env dans les variables d'environnement
require("dotenv").config();

nconf.env();

type config = {
    bdd: SequelizeConfig
    server: {
        port: number
    }
    jwt: {
        secret: string
    },
    cookie: {
        key : string
        secret_key: string
    }
}

const config: config = {
    bdd: {
        dialect: "mysql",
        host: nconf.get("database_host"),
        port: nconf.get("database_port"),
        username: nconf.get("database_username"),
        password: nconf.get("database_password"),
        database: nconf.get("database_database"),
        define: {
            timestamps: false
        }
    },
    server: {
        port: 8080
    },
    jwt: {
        secret: nconf.get("jwt_secret_key")
    },
    cookie: {
        key: nconf.get("cookie_key"),
        secret_key: nconf.get("cookie_secret_key")
    }
}

export default config;