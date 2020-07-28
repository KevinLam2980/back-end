const server = require('../api/server.js');
const supertest = require('supertest');
const Users = require('./users-model.js');
const db = require('../data/connection.js');

let baseURL = '/api/users';

describe('GET /', () => {
  // beforeEach(async () => {
  //   await db('users').truncate();
  //   await Users.add({ username: 'julia', password: 'judlin' });
  //   await Users.add({ username: 'victoria', password: 'benson' });
  // });

  it.todo('should return a list of users');

  it.todo('should respond with 200 OK');

  it.todo('should respond with JSON');
});

describe('POST /register', () => {
  // beforeEach(async () => {
  //   await db('users').truncate();
  // });

  it.todo('should add a new user to the database');

  it.todo('should respond with status 201 CREATED');

  it.todo('should respond with JSON');

  it.todo('should respond with the input username');
});

describe('POST /login', () => {
  // beforeEach(async () => {
  //   await db('users').truncate();
  //   await Users.add({
  //     username: 'marvin',
  //     password: '$2a$08$wiEa.8ol72Eb8bA/.eWDluR4m4cI/O2HA.s4rCIBRuLGk8hPdQS02',
  //   });
  // });

  it.todo('should respond with status 200 OK');

  it.todo(`should respond with message: "Welcome to our recipes API."`);

  it.todo(`should respond with JSON`);

  it.todo(`should respond with a token`);
});
