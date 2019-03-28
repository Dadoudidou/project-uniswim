import React, { Fragment } from "react"
import DocumentTitle from "../../../../Components/DocumentTitle";
import { Paper, Avatar, Typography, FormControl, InputLabel, Input, Button, StyleRulesCallback, withStyles, WithStyles, TextField, OutlinedInput } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

type classkey = "main" | "paper" | "avatar" | "form" | "submit"

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
    }
})

const Login = withStyles<classkey>(styles)((props: WithStyles<classkey>) => {
    return (
        <Fragment>
            <DocumentTitle title="Login Page" />
            <main className={props.classes.main}>
                <Paper className={props.classes.paper}>
                    <Avatar className={props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form className={props.classes.form}>
                        <TextField 
                            margin="normal"
                            fullWidth
                            required
                            label="Courriel"
                            autoFocus
                            autoComplete="email"
                        />
                        <TextField 
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            required
                            label="Mot de passe"
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={props.classes.submit}>
                            Se connecter
                        </Button>
                    </form>
                </Paper>
            </main>
        </Fragment>
    )
})
Login.displayName = "Login"

export default Login;