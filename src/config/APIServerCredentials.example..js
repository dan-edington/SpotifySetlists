const APIServerCredentials = {
  development: {
    serverBaseURL: 'DEV_SERVER_URL_HERE',
  },
  production: {
    serverBaseURL: 'LIVE_SERVER_URL_HERE',
  },
};

export default APIServerCredentials[process.env.NODE_ENV];
