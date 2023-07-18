import { ThemeProvider } from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: "Dubai Medium",
    // fontSize: "10px",
  }
})
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

