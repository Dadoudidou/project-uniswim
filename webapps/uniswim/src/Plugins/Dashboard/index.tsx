import React from "react"
import { IPlugin } from "../../System/PluginManager";
import { Route } from "react-router";
import Dashboard from "./Routes/Dashboard";
import { PrivateRoute } from "../UserSystem/Components/PrivateRoute";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";

export default {
    name: "Dashboard",
    loadRoutes: () => {
        return [
            <PrivateRoute key="dashboard-dashboard" path="/dashboard" component={Dashboard} />
        ]
    },
    loadMenus: () => {
        return [
            {
                order: 100,
                link_text: "Tableau de bord",
                link: "/dashboard"
            }
        ]
    }
} as IPlugin