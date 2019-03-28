import React, { Fragment } from "react"
import DocumentTitle from "../../../../Components/DocumentTitle";
import { Paper, Avatar, Typography, FormControl, InputLabel, Input, Button, StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

type classkey = "main" | "paper" | "avatar" | "form" | "submit"

const styles: StyleRulesCallback<classkey> = theme => ({
    main: {
        width: "auto",
        display: "block",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 *2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
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
                    <Typography component="h1" variant="h5">
                        Se connecter
                    </Typography>
                    <form className={props.classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Courriel</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <Input id="password" name="password" autoComplete="current-password" type="password" />
                        </FormControl>
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