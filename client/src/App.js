import React, {Component} from 'react';
import './css/index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './Utils/apollo';
import Router from './Router';
import GithubCallback from './containers/GithubCallback';
import ReactGA from 'react-ga'


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway', 
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
    color: '#fff'
  }
});
ReactGA.initialize('G-FP731512QW')

console.log(ReactGA.initialize('G-FP731512QW'))

const Application = () => {
  const urlParams = new URLSearchParams(window.location.search);
  

  if (urlParams.get('code')) {
    return <GithubCallback />
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </ThemeProvider>
    </div>
  )
};

export default Application;