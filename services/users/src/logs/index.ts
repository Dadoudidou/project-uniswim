import LoggerManager from "./LoggerManager/index";
import consoleTransport from "./LoggerManager/Transports/consoleTransport";

export default {
    logDatabase: LoggerManager.createLogger("bdd"),
    logExpress: LoggerManager.createLogger("server:express")
        .add(consoleTransport({ handleExceptions: true })),
    logGraphQl: LoggerManager.createLogger("server:graphQL")
};