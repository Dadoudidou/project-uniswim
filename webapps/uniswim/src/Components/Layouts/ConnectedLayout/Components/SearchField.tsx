import React from "react"
import { withStyles, WithStyles, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"

type classkey = "search" | "searchIcon" | "inputRoot" | "inputInput"

const SearchField = withStyles<classkey>(theme => ({
    search: {
        position: "relative",
        width: "100%",
        background: "rgba(255,255,255,0.5)",
        borderRadius: theme.spacing(1)
    },
    searchIcon: {
        position: "absolute",
        width: theme.spacing(9),
        height: "100%",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(10),
        transition: theme.transitions.create("width"),
        width: "100%",
    }
}))((props: WithStyles<classkey>) => {
    return (
        <div className={props.classes.search}>
            <div className={props.classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase 
                placeholder="Nom d'adhérent, numéro de licence, ..."
                classes={{
                    root: props.classes.inputRoot,
                    input: props.classes.inputInput
                }}
            />
        </div>
    )
});
SearchField.displayName = "SearchField"

export default SearchField