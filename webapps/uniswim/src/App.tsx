import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { getDefaultTheme } from './Utils/Theme';
import { RenderRoutes } from './System/Router';
import { PluginManager } from './System/PluginManager';
import UserSystem from './Plugins/UserSystem';
import Tests from './Plugins/Tests';
import { ApolloProvider } from "react-apollo"
import { getApolloClient } from './System/Store/Apollo';
import Dashboard from './Plugins/Dashboard';

//#region PLUGINS

PluginManager.GetInstance().add(UserSystem);
PluginManager.GetInstance().add(Dashboard);
PluginManager.GetInstance().add(Tests);

//#endregion

class App extends Component {
  render(){
    return (
      <Fragment>
        <ApolloProvider client={getApolloClient()}>
          <ThemeProvider theme={getDefaultTheme()}>
            <CssBaseline />
            <RenderRoutes routes={PluginManager.GetInstance().loadRoutes()} />
          </ThemeProvider>
        </ApolloProvider>
      </Fragment>
    )
  }
}


export default App;
