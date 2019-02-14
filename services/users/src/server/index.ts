import "reflect-metadata";

import serverApp from "./app";

serverApp()
.then(async (server) => {
    //server.listen(server.get("port"));
    //await server.start();
    //server.log(null, `Serveur démarré à l'url : ${server.info.uri}`);
})
.catch((err) => {
    console.log(err);
    process.exit(err.message);
})