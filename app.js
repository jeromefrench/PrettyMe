const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const SSEClient = require('./src/SSEClient');
const convertToRoman = require('./src/convertToRoman')
let client = null;
const SSEManager = require('./src/SSEManager');
const crypto = require('crypto');

sseManager = new SSEManager();
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send({ data: 'Hello World!' })
})

app.get('/', (req, res) => {
  res.sendFile('src/front/front.html', { root: __dirname });
})

app.post('/convert/:token', async (req, res) => {
  const { token } = req.params;
  let numberToConvert = req.body.numberToConvert;
  let test = {hello: 3}
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
  req.on('close', () => {
    sseManager.delete(tokenParam);
  });
});

module.exports = app;
