import React from "react"
import { IPlugin } from "../../System/PluginManager";
import { Route } from "react-router";
import Login from "./Routes/Login";
import { PrivateRoute } from "./Components/PrivateRoute";
import ProfilePage from "./Routes/Profile";

export default {
    name: "UserSystem",
    loadRoutes: () => {
        return [
            <Route key="usersystem-login" path="/login" component={Login} />,
            <PrivateRoute key="usersystem-profil" path="/profil" component={ProfilePage} />
        ]
    }
} as IPlugin