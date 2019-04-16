import React, { useState } from "react"
import { withStyles, WithStyles, InputBase, IconButton, Menu, MenuItem, withWidth } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import { WithWidth, isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

type classkey = "root"

const MenuBtn = withStyles<classkey>(theme => ({
    root: {
    }
}))(
    withWidth()(
        (props: WithStyles<classkey> & WithWidth) => {
            if(isWidthUp("md", props.width)) return null;
            return (
                <IconButton
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            )
        }
    )
);
MenuBtn.displayName = "MenuBtn"

export default MenuBtn;