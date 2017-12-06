const SpotifyCredentials = {
  production: {
    clientID: 'cee894f275734341a6dd69a408adbc70',
    clientSecret: '51b9f52e3eb34a74bc674fcbd1dfe70b',
    callbackURL: 'http://spotify-setlists.danedington.com/',
  },
  development: {
    clientID: 'cee894f275734341a6dd69a408adbc70',
    clientSecret: '51b9f52e3eb34a74bc674fcbd1dfe70b',
    callbackURL: 'http://localhost:3000/',
  },
};

export default SpotifyCredentials[process.env.NODE_ENV];
