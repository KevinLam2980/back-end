const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'Please sign-in again to validate your credentials.',
        });
      } else {
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Please sign in to access this page.' });
  }
};
