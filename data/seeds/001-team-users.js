exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'barbara',
          password:
            '$2a$08$As7Xra0oXR3nW6MxM0MwQumnbFjhWdvUWZ/VXw4gfBUMhEXEkyvuS',
        },
        {
          username: 'david',
          password:
            '$2a$08$AfDzi4lJIzH5/v08ZYh8cOSGNqpybWwKzDLrLTSPnXkk5UQoTvyp2',
        },
        {
          username: 'kevin',
          password:
            '$2a$08$rqrJj3hxWl.rede3bPRaRefm8VdWd2JEEtwqfDv/xtAfOOPBpFpyG',
        },
        {
          username: 'christian',
          password:
            '$2a$08$Sccrjqi5/Nr8ss8pOZZjjeUq65I0oFVlmsb7XWnZhC9ga9KxhfJwy',
        },
        {
          username: 'kate',
          password:
            '$2a$08$dXa3ULhxRO39zE.Q4HLwzu49cctdASiUlrseDRksj0o4rsQrpr2iS',
        },
        {
          username: 'beau',
          password:
            '$2a$08$rTXDjxWiwbi1ZTYkhZsBSuRxOxRVc0rndYRmYfIVrN8hiefxysbi2',
        },
      ]);
    });
};
