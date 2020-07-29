const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('./users-model.js');

router.use(express.json());

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === 'string'
  );
}

router.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json({ message: 'Failed to get users.' }));
});

// SET 1 - LOGIN/REGISTER
router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: 'Please provide a username and an alphanumeric password.',
    });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res
            .status(200)
            .json({ message: 'Welcome to our recipes API.', token });
        } else {
          res.status(401).json({ message: 'Invalid credentials.' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: 'Please provide a username and an alphanumeric password.',
    });
  }
});

// SET 2 - SIGNIN/SIGNUP
router.post('/signup', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: 'Please provide a username and an alphanumeric password.',
    });
  }
});

router.post('/signin', (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res
            .status(200)
            .json({ message: 'Welcome to our recipes API.', token });
        } else {
          res.status(401).json({ message: 'Invalid credentials.' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: 'Please provide a username and an alphanumeric password.',
    });
  }
});

// TOKEN CREATION
function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '2h',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
