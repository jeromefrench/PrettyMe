let request = require('supertest')
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

describe('Get /stream/token', () => {
  it('Should return a token', async () => {
    const res = await request(app)
      .get('/stream/token')
      .expect(200)
      .expect('Content-Type', /text/)
      .then((res) => {
        assert(res.text.length > 30);
      })
      .catch((err) => {
        assert(err === undefined);
      });
  });
})

const EventSource = require("eventsource");
describe('Get /stream/live/:token', () => {
  it('Should open an SSE connexion', async () => {
    const res = await request(app).get('/stream/token');
    const token = res.text;
    const eventSource = new EventSource('http://localhost:3000/stream/live/'+ token);
    const testConnection = () => {
      return new Promise((resolve) => {
        eventSource.addEventListener('confirm', event => {
          resolve(event.data);
        });
      })
    }
   const confirm = await testConnection();
    expect(confirm).toEqual('I confirm buddy');
  });
})


// const agent = request.agent(app);
// describe('Get /stream/convert/:token', () => {
//   it('Should received the roman number via SSE connexion', async () => {
//     let res = await agent.get('http://localhost:3000/stream/token');
//     const token = res.text;
//     const eventSource = new EventSource('http://localhost:3000/stream/live/'+ token);
//     const testConnection = () => {
//       return new Promise((resolve) => {
//         eventSource.addEventListener('confirm', event => {
//           resolve(event.data);
//         });
//       })
//     }
//     const confirm = await testConnection();
//     expect(confirm).toEqual('I confirm buddy');

//     res = await agent
//       .post("http://localhost:3000/convert/" + token)
//       .send({numberToConvert: 3})
//     .expect(200)
//     .expect('Content-Type', /text/)
//       .then((res) => {
//         assert(res.text == 'OK');
//         console.log(res);
//       })
//       .catch((err) => {
//         assert(err === undefined);
//       });

//     const testReceived = () => {
//       return new Promise((resolve) => {
//         eventSource.addEventListener('message', event => {
//           console.log(event.data);
//           resolve(event.data);
//         });
//       })
//     }
//     const number = await testReceived();
//     expect(number).toEqual('III');

//   });
// })
