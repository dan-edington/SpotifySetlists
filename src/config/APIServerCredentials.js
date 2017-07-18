const APIServerCredentials = {
  development: {
    serverBaseURL: 'http://localhost:3001',
  },
  production: {
    serverBaseURL: 'http://68.66.241.138:3001',
  },
};

export default APIServerCredentials[process.env.NODE_ENV];
