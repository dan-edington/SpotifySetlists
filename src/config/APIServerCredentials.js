let buildMode = 'development';

const APIServerCredentials = {
  development: {
    serverBaseURL: 'http://localhost:3001'
  },
  production: {
    serverBaseURL: 'http://68.66.241.138:3001'
  }
}

if(process.env.NODE_ENV === 'production') {
  buildMode = 'production';
} else {
  buildMode = 'development';
}

export default APIServerCredentials[buildMode];
