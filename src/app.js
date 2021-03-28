const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const convertToRoman = require('./convertToRoman');
const SSEManager = require('./SSEManager');
const crypto = require('crypto');
let client = null;

sseManager = new SSEManager();
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send({ data: 'Hello World!' })
})

app.get('/', (req, res) => {
  res.sendFile('front/front.html', { root: __dirname });
})

app.post('/convert/:token', async (req, res) => {
  const { token } = req.params;
  let numberToConvert = req.body.numberToConvert;
  res.send("OK");
  sseManager.unicast(token, convertToRoman(numberToConvert));
})

app.get('/stream/token', async (req, res) => {
  const streamToken = crypto.randomBytes(64).toString('hex');
  res.send( streamToken );
})

app.get('/stream/live/:token', async (req, res) => {
  const { app, user } = req;
  const { token: tokenParam } = req.params;
  sseManager.open(tokenParam, res);
  sseManager.confirmConnection(tokenParam);
  req.on('close', () => {
    sseManager.delete(tokenParam);
  });
});

module.exports = app;
