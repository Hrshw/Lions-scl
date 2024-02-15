// middleware/authentication.js
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token == null) return res.redirect('/login');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.redirect('/login');
    }
    req.user = user;
    next();
  });
};


module.exports = { authenticateToken };
