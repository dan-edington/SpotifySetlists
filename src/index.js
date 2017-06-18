import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';
import App from './App';
import AuthCallback from './components/AuthCallback';
import appState from './reducers/appState';
import authState from './reducers/authState';
//import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const routerHistoryMiddleware = routerMiddleware(history);

let SpotifySetlistStore = createStore(
  combineReducers({
    appState,
    authState,
    router: routerReducer
  }),
  applyMiddleware(thunk, routerHistoryMiddleware)
);

ReactDOM.render(
  <Provider store={SpotifySetlistStore}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/auth/spotify/callback" component={AuthCallback} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();
