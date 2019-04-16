import * as React from "react";
import { Grid, Typography } from "@material-ui/core"

type AuthentificationLoadingProps = {}

class AuthentificationLoading extends React.PureComponent<AuthentificationLoadingProps, any>
{
    render(){
        return (
            <Grid 
                container 
                style={{ 
                    height: "75%", 
                    position: "absolute", 
                    top:0, left:0, right:0,
                    textAlign: "center"
                }} 
                direction="row" 
                justify="center" 
            >
                <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
                    <Typography>
                        En cours d'authentification...
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default AuthentificationLoading;