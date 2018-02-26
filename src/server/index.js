const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const serverlessHTTP = require('serverless-http');

const app = express();
const port = config.serverConfig.port;

app.use(bodyParser.json());

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

});

app.post('/searchSetlists', (req, res) => {

  const query = `?artistName=${req.body.artistName}`;

  fetch(`https://api.setlist.fm/rest/1.0/search/setlists${query}`, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'x-api-key': config.keys.setlistfm,
      'Accept': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((response) => {

    res.send(response);

  }).catch((error) => {

    console.log(error);

  });

});

app.listen(port, () => {

  console.log(`Listening on port ${port}...`);

});

module.exports.handler = serverlessHTTP(app);
