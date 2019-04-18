import * as Express from "express"
import { ApolloServer, gql, AuthenticationError } from "apollo-server-express"
import config from "@config/*";
import graphQL, { UserContext } from "./graphQL";
import logs from "@logs/*";
import LogErrors from "./middlewares/LogErrors";
import ClientErrorHandler from "./middlewares/ClientErrorHandler";
import ErrorHandler from "./middlewares/ErrorHandler";
import LogHttpRequest from "./middlewares/LogHttpRequest";
import * as Helmet from "helmet"
import database from "@database/*";
import * as cookieParser  from "cookie-parser";
import * as BodyParser from "body-parser"
import * as jwt from "jsonwebtoken"
import { defineAbilitiesForUser } from "./../utils/Abilities";


async function createServer(){
    // -- express Server
    const app = Express();

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: false }));

    // -- configuration
    app.set("port", config.server.port);

    

    // -- cookies
    app.use(cookieParser(config.cookie.secret_key));

    // -- express logging
    app.use(LogHttpRequest)

    // -- securite des entetes
    app.use(Helmet())
    app.disable("x-powered-by");

    // -- allow cors
    app.use((req, res, next) => {
        let _origin = req.get("Origin");
        res.header("Access-Control-Allow-Origin", _origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    })    

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
        context: async ({ req, res }) => {
            
            let token: string = null;
            let userContext: UserContext = null;

            // -- récupération du token
            // ---- authentification via cookie
            if(req.signedCookies && req.signedCookies[config.cookie.key]){
                token = req.signedCookies[config.cookie.key];
            }
            // ---- authentification via token

            
            if(token){
                // -- TEST CACHE ou REQUETE BDD

                let userJwt: { id: number, client_id: number } = null;
                // -- test du token
                try {
                    userJwt = jwt.verify(token, config.jwt.secret) as { id:number, client_id: number };
                    if(userJwt && !userJwt.id) throw new AuthenticationError("Token de connexion invalide");
                } catch(err){
                    throw new AuthenticationError("Token de connexion invalide");
                }
                // -- create user context
                userContext.id = userJwt.id;
                userContext.token = token;
                let _client = await database.repos.client.GetClient(userJwt.id);
                userContext.entity = await database.repos.utilisateur.GetUtilisateurFromClient(_client, { id:userJwt.id });
                userContext.ability = await defineAbilitiesForUser(userContext.entity);
            }

            return {
                log: logs.logGraphQl,
                models: database.models,
                database: database.bdd,
                repos: database.repos,
                user: userContext
            };
        }
    });
    graphQlServer.applyMiddleware({
        app: app,
        path: "/api/graphql"
    });

    // -- endpoint to control the creation of the cookie
    /*
    app.get('/get', (req, res) => {
        // MAIN CODE HERE :
        const signedCookies = req.signedCookies; // get signed cookies
        console.log('signed-cookies:', signedCookies);  
        const cookies = req.cookies; // get not signed cookies
        console.log('not-signed-cookies:', cookies);
        // or access directly to one cookie by its name :
        const myTestCookie = req.signedCookies.test;
        console.log('our test signed cookie:', myTestCookie);
        res.send('get cookie');
    });
    */

    app.get('/credentialCookie', (req, res) => {

        // -- cookies signés
        const signedCookies = req.signedCookies;
        const token = signedCookies[config.cookie.key];
        if(!token) {
            return res
                .status(401)
                .send("Une authentification est nécessaire")
                .end();
        }

        // -- vérification du token
        try {
            jwt.verify(token, config.jwt.secret);
        } catch(err){
            return res
                .status(401)
                .send("Token invalide")
                .end();
        }

        res.send("OK").end();
    });

   /**
    * Création de cookie à partir d'un token
    * Paramètres d'entrées :
    * - expireInDays    : number (optional)
    * - token           : string
    */
    app.post('/credentialCookie', (req, res) => {

        // -- Récupération des infos
        let expireInDays = req.body.expireInDays || 1
        let token = req.body.token;
        if(!token) {
            return res
                .status(400)
                .send("Aucun token passé en paramètre")
                .end();
            //throw new Error("Aucun token passé en paramètre");
        }

        // -- vérification du token envoyé
        try {
            jwt.verify(token, config.jwt.secret);
        } catch(err){
            return res
                .status(400)
                .send("Token invalide")
                .end();
            //throw new Error("Token invalide");
        }

        // -- création du cookie
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + (expireInDays));

        res.cookie(config.cookie.key, token, {
            expires: currentDate,
            httpOnly: false,             // -- to disable accessing cookie via client side js,
            //secure: true              // -- to force https
            //maxAge: 1000000000,         // -- ttl in ms (remove this option and cookie will die when browser is closed)
            signed: true                // -- if you use the secret with cookieParser
        });
        res.send("OK").end();
    });

    // -- endpoint to destroy the cookie
    app.delete('/credentialCookie',(req, res) => {
        res.cookie(config.cookie.key, "");
        res.send('OK').end();
    });

    // -- ecoute du port
    app.listen(app.get("port"), () => {
        logs.logExpress.info(`Server listening on port ${app.get('port')}`);
    });

    return app;
}

export default createServer;