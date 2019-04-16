import React from "react"
import { AppBar, Toolbar, Drawer, WithStyles } from "@material-ui/core";
import SearchField from "./Components/SearchField";
import UserBtn from "./Components/UserBtn";
import LogoField from "./Components/LogoField";
import Sidebar from "./Components/Sidebar";
import DocumentTitle from "../../DocumentTitle";
import { withStyles } from "@material-ui/core";
import MenuBtn from "./Components/MenuBtn";

type classkey = "app"

type props = {
    title: string
}

const ConnectedLayout = withStyles<classkey>(theme => ({
    app: {
        marginLeft: theme.spacing(0),
        [theme.breakpoints.up("md")]:{
            marginLeft: theme.spacing(30)
        }
    }
}))(
    (props: React.PropsWithChildren<props> & WithStyles<classkey>) => {
        return (
            <React.Fragment>
                <DocumentTitle title={props.title} />
                <Sidebar />
                <div className={props.classes.app}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <MenuBtn />
                            <SearchField />
                            <UserBtn />
                        </Toolbar>
                    </AppBar>
                    <main>
                        {props.children}
                    </main>
                </div>
            </React.Fragment>
        )
    }
)
ConnectedLayout.displayName = "ConnectedLayout";

export default ConnectedLayout;