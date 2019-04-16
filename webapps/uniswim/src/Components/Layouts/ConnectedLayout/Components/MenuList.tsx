import React from "react"
import { PluginManager, MenuItem } from "../../../../System/PluginManager";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

type MenuItemProps = {
    item: MenuItem
}
const TMenuItem = withRouter(
    (props: MenuItemProps & RouteComponentProps) => {
        return (
            <ListItem 
                button={Boolean(props.item.link) as any}
                component={Link}
                to={props.item.link}
                selected={props.item.link && props.item.link.indexOf(props.history.location.pathname) > -1}
            >
                <ListItemText primary={props.item.link_text} />
            </ListItem>
        )
    }
)
TMenuItem.displayName = "TMenuItem";

const MenuList = (props) => {
    let _menus = PluginManager.GetInstance().loadMenus();
    return (
        <List>
            {_menus.map((x, i) => {
                if(x.element) return x.element;
                return <TMenuItem key={i} item={x} />
            })}
        </List>
    )
};

MenuList.displayName= "MenuList";
export default MenuList;