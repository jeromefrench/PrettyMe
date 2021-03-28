const request = require('supertest')
var assert = require("assert");
const app = require('../src/app')

describe('Get /hello', () => {
  it('Should say Hello World', async () => {
    const res = await request(app)
      .get('/hello')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toEqual('Hello World!');
  })
})

describe('Get /', () => {
  it('Should return form to convert number', async () => {
    const res = await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
  })
})

describe('Get /convert', () => {
  it('Should return the roman number III for 3', async () => {
    const res = await request(app)
      .post('/convert')
      .send({numberToConvert: 3})
      .expect(200)
      .expect('Content-Type', /text/)
      .then((res) => {
        assert(res.text == 'III');
      })
      .catch((err) => {
        assert(err === undefined);
      });
  });
})
