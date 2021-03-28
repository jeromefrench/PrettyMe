const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const convertToRoman = require('./convertToRoman');
let client = null;

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send({ data: 'Hello World!' })
})

app.get('/', (req, res) => {
  res.sendFile('front/front.html', { root: __dirname });
})

app.post('/convert', async (req, res) => {
  let numberToConvert = req.body.numberToConvert;
  res.send(convertToRoman(numberToConvert));
})

module.exports = app;
