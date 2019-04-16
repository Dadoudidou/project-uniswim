import React, { useState } from "react"
import { withStyles, WithStyles, InputBase, IconButton, Menu, MenuItem, Divider } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle"

type classkey = "root"

const UserBtn = withStyles<classkey>(theme => ({
    root: {}
}))((props: WithStyles<classkey>) => {
    const [open, setOpen] = useState<boolean>();
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    return (
        <React.Fragment>
            <IconButton
                color="inherit"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem>Profil</MenuItem>
                <MenuItem>Paramètres</MenuItem>
                <Divider />
                <MenuItem>Se déconnecter</MenuItem>
            </Menu>
        </React.Fragment>
    )
});
UserBtn.displayName = "UserBtn"

export default UserBtn;