const server = require('../api/server.js');
const supertest = require('supertest');
const Users = require('./users-model.js');
const db = require('../data/connection.js');

let baseURL = '/api/users';

// it.todo('filler test');

describe('GET /', () => {
  beforeEach(async () => {
    await db('users').truncate();
    await Users.add({ username: 'julia', password: 'judlin' });
    await Users.add({ username: 'tori', password: 'benson' });
  });

  it('should return a list of users', async () => {
    await supertest(server)
      .get(`${baseURL}`)
      .then((res) => {
        expect(res.body).toHaveLength(2);
      });
  });

  it('should respond with 200 OK', async () => {
    await supertest(server).get(`${baseURL}`).expect(200);
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .get(`${baseURL}`)
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });
});

describe('POST /register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should add a new user to the database', async () => {
    await supertest(server)
      .post(`${baseURL}/register`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        return supertest(server)
          .get(`${baseURL}`)
          .then((res) => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('should respond with status 201 CREATED', async () => {
    await supertest(server)
      .post(`${baseURL}/register`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .post(`${baseURL}/register`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('should respond with the input username', async () => {
    await supertest(server)
      .post(`${baseURL}/register`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        expect(res.body.data.username).toBe('joe');
      });
  });
});

describe('POST /login', () => {
  beforeEach(async () => {
    await db('users').truncate();
    await Users.add({
      username: 'marvin',
      password: '$2a$08$wiEa.8ol72Eb8bA/.eWDluR4m4cI/O2HA.s4rCIBRuLGk8hPdQS02',
    });
  });

  it('should respond with 200 OK', async () => {
    await supertest(server)
      .post(`${baseURL}/login`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it(`should respond with message: "Welcome to our recipes API."`, async () => {
    await supertest(server)
      .post(`${baseURL}/login`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.body.message).toBe(`Welcome to our recipes API.`);
      });
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .post(`${baseURL}/login`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it(`should respond with a token`, async () => {
    await supertest(server)
      .post(`${baseURL}/login`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.body.token).toBeTruthy();
      });
  });
});

// Duplicate for 2nd set of forms //

describe('POST /signup', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should add a new user to the database', async () => {
    await supertest(server)
      .post(`${baseURL}/signup`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        return supertest(server)
          .get(`${baseURL}`)
          .then((res) => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('should respond with status 201 CREATED', async () => {
    await supertest(server)
      .post(`${baseURL}/signup`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .post(`${baseURL}/signup`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('should respond with the input username', async () => {
    await supertest(server)
      .post(`${baseURL}/signup`)
      .send({ username: 'joe', password: 'garcia' })
      .then((res) => {
        expect(res.body.data.username).toBe('joe');
      });
  });
});

describe('POST /signin', () => {
  beforeEach(async () => {
    await db('users').truncate();
    await Users.add({
      username: 'marvin',
      password: '$2a$08$wiEa.8ol72Eb8bA/.eWDluR4m4cI/O2HA.s4rCIBRuLGk8hPdQS02',
    });
  });

  it('should respond with 200 OK', async () => {
    await supertest(server)
      .post(`${baseURL}/signin`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it(`should respond with message: "Welcome to our recipes API."`, async () => {
    await supertest(server)
      .post(`${baseURL}/signin`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.body.message).toBe(`Welcome to our recipes API.`);
      });
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .post(`${baseURL}/signin`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it(`should respond with a token`, async () => {
    await supertest(server)
      .post(`${baseURL}/signin`)
      .send({ username: 'marvin', password: 'homan' })
      .then((res) => {
        expect(res.body.token).toBeTruthy();
      });
  });
});
