import React from "react"
import { IPlugin } from "../../System/PluginManager";
import { Route } from "react-router";
import TestPage from "./Test";

export default {
    name: "test",
    loadRoutes: () => [
        <Route key="Tests-test" path="/test" component={TestPage} />
    ]
} as IPlugin