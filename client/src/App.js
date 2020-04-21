import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Team from './components/Team';
import { HomeContextProvider } from './contexts/HomeContext';
import { MapContextProvider } from './contexts/MapContext';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'Lato', sans-serif",
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    }
  });

class App extends Component {
  render() {
    const App = () => (
      <div>
        <ThemeProvider theme={theme}>
            <Switch>
            <Route exact path='/'>
                <HomeContextProvider>
                    <MapContextProvider>
                        <Home />
                    </MapContextProvider>
                </HomeContextProvider>
            </Route>
            <Route path='/about-us' component={Team}/>
            </Switch>
        </ThemeProvider>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;