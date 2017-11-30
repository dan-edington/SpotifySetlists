const SpotifyCredentials = {
  production: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'LIVE_SERVER_URL_HERE',
  },
  development: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'DEV_SERVER_CALLBACK_URL_HERE',
  },
};

export default SpotifyCredentials[process.env.NODE_ENV];
