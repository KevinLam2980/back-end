const Users = require('./users-model.js');
const db = require('../data/connection.js');

describe('users model', () => {
  describe('find method', () => {
    // beforeEach(async () => {
    //   await db('users').truncate();
    //   await Users.add({ username: 'joe', password: 'garcia' });
    //   await Users.add({ username: 'jben', password: 'ransom' });
    // });

    it('should return a list of all users');
  });

  describe('add method', () => {
    // beforeEach(async () => {
    //   await db('users').truncate();
    // });

    it('should insert the provided user into the database');
  });
});
