const express = require('express');
const path = require('path');

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b05939a25b5948ae8b35c5f1652e4c8e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})


const port = process.env.PORT || 4545
app.listen(port, () => console.log(`Battleship docking at port ${port}!`));