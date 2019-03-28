import React from "react"
import { RouteProps, Switch, Route, Router } from "react-router-dom"
import NotFoundPage from "../../Components/ErrorsPages/NotFoundPage";
import { createHashHistory } from "history";


// -- HISTORY
let _history = createHashHistory();
export const getHistory = () => _history;


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
