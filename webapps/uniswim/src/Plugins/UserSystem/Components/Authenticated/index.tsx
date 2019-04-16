import React from "react"
import { getHistory } from "../../../../System/Router";
import AuthentificationLoading from "../AuthenticatedLoading";
import { testCookie } from "../../Utils";
import { Location } from "history";

export type AuthenticatedProps = {
    children: React.ReactNode
    AuthentificationLoading?: string | React.FunctionComponent<any> | React.ComponentClass<any, any>
    onFailed?: (() => void) | string
    onSuccess?: (() => void) | string
    isLoggedFn?: () => Promise<boolean>
    location?: Location
}

type AuthenticatedState = {
    loading?: boolean
    authenticated?: boolean
}

class Authenticated extends React.PureComponent<AuthenticatedProps, AuthenticatedState>
{
    static defaultProps: Partial<AuthenticatedProps> = {
        onFailed: "/login",
        AuthentificationLoading: AuthentificationLoading,
        isLoggedFn: testCookie
    }
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.props.isLoggedFn()
        .then((connected) => {
            this.setState({ loading: false, authenticated: connected });
            if(connected){
                if(this.props.onSuccess){
                    if(typeof(this.props.onSuccess) == "string"){
                        getHistory().push(this.props.onSuccess);
                    } else {
                        this.props.onSuccess();
                    }
                }
            } else {
                if(this.props.onFailed){
                    if(typeof(this.props.onFailed) == "string"){
                        let _uri = this.props.onFailed;
                        if(this.props.location){
                            _uri = `${_uri}?r=${this.props.location.pathname}`;
                        }
                        getHistory().push(_uri);
                    } else {
                        this.props.onFailed();
                    }
                }
            }
        })
        .catch((err) => {
            if(this.props.onFailed){
                if(typeof(this.props.onFailed) == "string"){
                    getHistory().push(this.props.onFailed);
                } else {
                    this.props.onFailed();
                }
            }
        })
    }
    render(){
        if(this.state.loading) return React.createElement(this.props.AuthentificationLoading)
        if(!this.state.authenticated) return <div></div>
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}

export default Authenticated;