const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const userRouter = require('../users/users-router.js');
const recipeRouter = require('../recipes/recipes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/recipes', authenticate, recipeRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: `it's working, it's working!` });
});

module.exports = server;
