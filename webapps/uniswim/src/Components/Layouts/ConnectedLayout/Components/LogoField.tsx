import React, { useState } from "react"
import { withStyles, WithStyles, InputBase, IconButton, Menu, MenuItem, withWidth } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle"
import { WithWidth, isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

type classkey = "root"

const LogoField = withStyles<classkey>(theme => ({
    root: {
        height: theme.spacing(6),
        zIndex: -1,
        "@media (min-width:0px) and (orientation: landscape)": {
            height: theme.spacing(7),
        },
        [theme.breakpoints.up("md")]:{
            height: theme.spacing(8),
        }
    }
}))(withWidth()((props: WithStyles<classkey> & WithWidth) => {
    return (
        <div className={props.classes.root}>
            Logo
        </div>
    )
}));
LogoField.displayName = "LogoField"

export default LogoField;