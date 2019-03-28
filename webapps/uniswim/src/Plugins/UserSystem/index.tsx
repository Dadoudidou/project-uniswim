import React from "react"
import { IPlugin } from "../../System/PluginManager";
import { Route } from "react-router";
import Login from "./Routes/Login";

export default {
    name: "UserSystem",
    loadRoutes: () => {
        return [
            <Route key="usersystem-login" path="/login" component={Login} />
        ]
    }
} as IPlugin