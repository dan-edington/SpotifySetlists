import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider, injectGlobal } from 'styled-components';
import App from './App';
import appState from './reducers/appState';
import authState from './reducers/authState';

injectGlobal([`

* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  background: #565656;
  font-family: sans-serif;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

`]);

const theme = {};

const SpotifySetlistStore = createStore(
  combineReducers({
    appState,
    authState,
  }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={SpotifySetlistStore}>
      <App />
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
);
