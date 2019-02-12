// DOCUMENTATIONS
// https://github.com/RobinBuschmann/sequelize-typescript

import { Sequelize } from "sequelize-typescript"
import config from "@config/index";
import Abilite from "./models/Abilite";
import Application from "./models/Application";
import Client from "./models/Client";
import Contact from "./models/Contact";
import Role from "./models/Role";
import Utilisateur from "./models/Utilisateur";
import ClientApplication from "./models/ClientApplication";
import RoleAbilite from "./models/RoleAbilite";
import UtilisateurAbilite from "./models/UtilisateurAbilite";
import UtilisateurRole from "./models/UtilisateurRole";
import { Player, Team } from "./models/Test";


const sequelize = new Sequelize({
    ...config.bdd,
});

sequelize.addModels([ 
    Contact, Client, Application, Abilite, Role, 
    Utilisateur, ClientApplication, RoleAbilite, 
    UtilisateurAbilite, UtilisateurRole 
]);


const models = {
    Client, Contact, Application, Abilite, Role, Utilisateur
}

export default {
    bdd: sequelize,
    models: models
}
