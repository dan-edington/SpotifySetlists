import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Route } from 'react-router';
import thunk from 'redux-thunk';
import App from './App';
import appState from './reducers/appState';
import authState from './reducers/authState';

let SpotifySetlistStore = createStore(
  combineReducers({
    appState,
    authState
  }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={SpotifySetlistStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
