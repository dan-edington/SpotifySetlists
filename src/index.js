import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

let SpotifySetlistStore = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={SpotifySetlistStore}>
    <App />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
