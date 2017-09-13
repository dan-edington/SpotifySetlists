import { Client } from 'spotify-sdk';
import SpotifyCredentials from '../config/SpotifyCredentials';

let client = Client.instance;

client.settings = {
  clientId: SpotifyCredentials.clientID,
  secretId: SpotifyCredentials.clientSecret,
  scopes: ['playlist-modify-private'],
  redirect_uri: SpotifyCredentials.callbackURL,
};

const initialState = {
  client,
  loggedIn: false,
};

const authState = (state = initialState, action) => {

  let returnState;
  let loggedIn;

  switch (action.type) {

    case 'SET_TOKEN':

      let theToken = null;
      loggedIn = false;

      if (sessionStorage.token) {

        theToken = sessionStorage.token;

      } else if (window.location.hash.split('&')[0].split('=')[1]) {

        sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
        theToken = sessionStorage.token;

      }

      client.token = theToken;

      if (theToken) {

        loggedIn = true;

      }

      returnState = {
        ...state,
        client,
        loggedIn,
      };

      break;

    case 'CLEAR_TOKEN':

      sessionStorage.removeItem('token');
      client.token = null;
      loggedIn = false;

      returnState = {
        ...state,
        client,
        loggedIn,
      };

      break;

    default:
      returnState = state;

  }

  return returnState;

};

export default authState;
