import React, { useState } from "react"
import { withStyles, WithStyles, InputBase, IconButton, Menu, MenuItem, Drawer, withWidth } from "@material-ui/core";
import { isWidthDown, WithWidth, isWidthUp } from "@material-ui/core/withWidth";
import LogoField from "./LogoField";
import MenuList from "./MenuList";

type classkey = "drawer" | "drawerPaper"

const Sidebar = withStyles<classkey>(theme => ({
    drawer: {
        width: theme.spacing(30)
    },
    drawerPaper: {
        width: theme.spacing(30),
    }
}))( withWidth()((props: WithStyles<classkey> & WithWidth) => {
    let _open = false;
    if(isWidthUp("md", props.width)) _open = true;
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={_open}
            className={props.classes.drawer}
            classes={{
                paper: props.classes.drawerPaper
            }}
        >
            <LogoField />
            <MenuList />
        </Drawer>
    )
}));
Sidebar.displayName = "Sidebar"

export default Sidebar;