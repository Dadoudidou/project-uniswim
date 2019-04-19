import React, { Fragment, useState } from "react"
import DocumentTitle from "../../../../Components/DocumentTitle";
import { Paper, Avatar, Typography, FormControl, InputLabel, Input, Button, StyleRulesCallback, withStyles, WithStyles, TextField, OutlinedInput, CircularProgress } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { compose, graphql } from "react-apollo";
import {LoginMutationData, LoginMutationVariables, LoginMutation, CurrentCredentialQuery } from "../../Queries";
import mutatable, { WithMutatable } from "../../../../System/Store/Apollo/mutatable";
import { createCookie } from "../../Utils";
import { RouteComponentProps } from "react-router";
import { queryVariableParse, getHistory } from "../../../../System/Router";

type classkey = "main" | "paper" | "avatar" | "form" | "submit" | "avatarWrapper" | "progressBar"

const styles: StyleRulesCallback<classkey> = theme => ({
    main: {
        width: "auto",
        display: "block",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) *2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    avatarWrapper: {
        position: 'relative',
    },
    progressBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: theme.spacing(12),
        height: theme.spacing(12)
    }
})

type props = {
    login: WithMutatable<LoginMutationData, LoginMutationVariables>
} & WithStyles<classkey> & RouteComponentProps

const Login = (props: props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <Fragment>
            <DocumentTitle title="Login Page" />
            <main className={props.classes.main}>
                <Paper className={props.classes.paper}>
                    <div className={props.classes.avatarWrapper}>
                        <Avatar className={props.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {props.login.loading && <CircularProgress size="" thickness={2}  className={props.classes.progressBar} />}
                    </div>
                    <form className={props.classes.form} 
                        onSubmit={async (ev) => {
                            let data = await props.login.submit(ev, { email, password });
                            if(!data.errors){
                                await createCookie(data.data.createCredential);
                                let _parseUri = queryVariableParse(props.history.location);
                                let _return_url = _parseUri && _parseUri["r"];
                                if(_return_url){
                                    props.history.push(_return_url);
                                }
                            }
                        }}>
                        {props.login.error && <Typography color="error">{props.login.error}</Typography>}
                        <TextField 
                            type="email"
                            margin="normal"
                            fullWidth
                            required
                            label="Courriel"
                            autoFocus
                            autoComplete="email"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                        <TextField 
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            required
                            label="Mot de passe"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={props.classes.submit}>
                            Se connecter
                        </Button>
                    </form>
                </Paper>
            </main>
        </Fragment>
    )
};
Login.displayName = "Login";


export default compose(
    graphql(LoginMutation, { name: "login" }),
    mutatable<LoginMutationData, LoginMutationVariables>({ 
        mutationName: "login",
        options: {
            update: (proxy, { data }) => {
                // -- store credentials in cache
                if(data && data.createCredential){
                    const credential = {
                        token: data.createCredential, 
                        __typename: 'credential'
                    };
                    proxy.writeQuery({
                        query: CurrentCredentialQuery, 
                        data: { credential }
                    });
                }
            },
        }
    })
)(withStyles<classkey>(styles)(Login));