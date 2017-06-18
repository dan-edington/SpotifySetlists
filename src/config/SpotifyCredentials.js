let buildMode = 'development';

const SpotifyCredentials = {
  production: {
    clientID: 'cee894f275734341a6dd69a408adbc70',
    clientSecret: '9abd04578d1341c6bc6c3544a7d17bd0',
    callbackURL: 'http://www.danedington.com/spotifySetlists/'
  },
  development: {
    clientID: 'cee894f275734341a6dd69a408adbc70',
    clientSecret: '9abd04578d1341c6bc6c3544a7d17bd0',
    callbackURL: 'http://localhost:3000/auth/spotify/callback'
  }
}

if(process.env.NODE_ENV === 'production') {
  buildMode = 'production';
} else {
  buildMode = 'development';
}

export default SpotifyCredentials[buildMode];
