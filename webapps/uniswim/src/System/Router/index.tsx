import React from "react"
import { RouteProps, Switch, Route, Router } from "react-router-dom"
import NotFoundPage from "../../Components/ErrorsPages/NotFoundPage";
import { createHashHistory, Location } from "history";


// -- HISTORY
let _history = createHashHistory();
export const getHistory = () => _history;

export const queryVariableParse = (location: Location): {[key:string]:string} => {
    if(!location) return undefined;
    if(!location.search) return undefined;
    let _query = location.search;
    let _results = {};
    // -- remove ?
    if(_query.substring(0, 1) == "?") _query = _query.substring(1);
    // -- parse
    let _vars = _query.split("&");
    for(let i=0; i<_vars.length; i++){
        var pair = _vars[i].split("=");
        _results[decodeURIComponent(pair[0])] = pair[1];
    }
    return _results;
}


type RenderRoutesProps = {
    routes: React.ReactElement<RouteProps>[]
}

export class RenderRoutes extends React.Component<RenderRoutesProps, any>
{
    render(){
        return (
            <Router history={getHistory()}>
                <Switch>
                    <Route exact path="/" component={() => <div>Start Page</div>} />
                    {this.props.routes}
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        )
    }
}
