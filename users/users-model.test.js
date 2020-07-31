const Users = require('./users-model.js');
const db = require('../data/connection.js');

// it.todo('filler test');

describe('users model', () => {
  describe('find method', () => {
    beforeEach(async () => {
      await db('users').truncate();
      await Users.add({ username: 'joe', password: 'garcia' });
      await Users.add({ username: 'ben', password: 'ransom' });
    });

    it('should return a list of all users', async () => {
      const users = await Users.find();
      // expect(users).toHaveLength(3);
      expect(users).toHaveLength(2);
    });
  });

  describe('findBy method', () => {
    beforeEach(async () => {
      await db('users').truncate();
      await Users.add({ username: 'ben', password: 'ransom' });
    });

    it('should find the provided user in the database', async () => {
      // const user = await Users.findBy({ username: 'joe' });
      const user = await Users.findBy({ username: 'ben' });
      expect(user).toHaveLength(1);
    });
  });

  describe('add method', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert the provided user into the database', async () => {
      await Users.add({ username: 'joe', password: 'garcia' });
      const users = await db('users');
      // expect(users).toHaveLength(3);
      expect(users).toHaveLength(1);
    });
  });

  describe('findById method', () => {
    beforeEach(async () => {
      await db('users').truncate();
      await Users.add({ username: 'ben', password: 'ransom' });
      await Users.add({ username: 'tori', password: 'benson' });
    });

    it('should find the provided user in the database', async () => {
      const user = await Users.findById(2);
      // expect(users).toHaveLength(3);
      // expect(user.id).toEqual(1);
      expect(user.id).toEqual(2);
    });
  });
});
