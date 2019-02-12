import * as nconf from "nconf"
import { SequelizeConfig } from "sequelize-typescript/lib/types/SequelizeConfig";

// -- met les variables du fichier .env dans les variables d'environnement
require("dotenv").config();

nconf.env();

type config = {
    bdd: SequelizeConfig
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
    }
}

export default config;