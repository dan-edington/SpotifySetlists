const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const SETLIST_API_KEY = config.SETLIST_API_KEY;
const port = config.PORT;

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

});

app.post('/setlist.fm/searchSetlists', (req, res) => {

  axios({
    method: 'get',
    url: 'https://api.setlist.fm/rest/1.0/search/setlists',
    params: {
      artistName: req.body.artistName,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'x-api-key': SETLIST_API_KEY,
    },
  }).then((response) => {

    res.send(response.data);

  }).catch((error) => {

    console.log(error);

  });

});

app.listen(port, () => {

  console.log(`Listening on http://localhost:${port}`);

});
