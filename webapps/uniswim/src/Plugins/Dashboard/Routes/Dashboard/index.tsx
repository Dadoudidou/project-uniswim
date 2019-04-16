import React from "react"
import DocumentTitle from "../../../../Components/DocumentTitle";
import { AppBar, Toolbar, Drawer } from "@material-ui/core";
import ConnectedLayout from "../../../../Components/Layouts/ConnectedLayout";



const DashboardPage = () => {
    return (
        <ConnectedLayout title="Tableau de bord">
            <div>test page</div>
        </ConnectedLayout>
    )
}
DashboardPage.displayName = "DashboardPage";

export default DashboardPage;