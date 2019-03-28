import React, { Component, Fragment } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { getDefaultTheme } from './Utils/Theme';
import { RenderRoutes } from './System/Router';
import { PluginManager } from './System/PluginManager';
import UserSystem from './Plugins/UserSystem';
import Tests from './Plugins/Tests';
import { ApolloProvider } from "react-apollo"
import { getApolloClient } from './System/Store/Apollo';

//#region PLUGINS

PluginManager.GetInstance().add(UserSystem);
PluginManager.GetInstance().add(Tests);

//#endregion

class App extends Component {
  render(){
    return (
      <Fragment>
        <CssBaseline />
        <ApolloProvider client={getApolloClient()}>
          <MuiThemeProvider theme={getDefaultTheme()}>
            <RenderRoutes routes={PluginManager.GetInstance().loadRoutes()} />
          </MuiThemeProvider>
        </ApolloProvider>
      </Fragment>
    )
  }
}


export default App;
