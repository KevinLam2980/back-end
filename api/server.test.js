const server = require('./server.js');
const supertest = require('supertest');

// it.todo('filler test');

describe('environment', () => {
  it('should be using the testing database', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('server', function () {
  it('runs the tests', () => {
    expect(true).toBe(true);
  });

  describe('GET /', () => {
    it('should respond with 200 OK', async () => {
      await supertest(server).get('/').expect(200);
    });

    it('should respond with JSON', async () => {
      await supertest(server)
        .get('/')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it(`should respond with api: "it's working, it's working!"`, async () => {
      await supertest(server)
        .get('/')
        .then((res) => {
          expect(res.body.api).toBe(`it's working, it's working!`);
        });
    });
  });
});
