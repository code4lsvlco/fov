const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');

//From authentication.js controller in AdvancedReduxCode
const jwt = require('jwt-simple');
const User = require('../models/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// Helper Functions

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SESSION_SECRET);
}

// Routes

// router.get('/', requireAuth, function(req, res) {
//   res.send({ message: 'Super secret code is ABC123' });
// });

router.post('/signin', requireSignin, function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
});

router.post('/signup', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      // return res.status(422).send({ email: 'Email is in use' });
      return res.status(422).send({ email: 'Email is already in use.' });
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    });
  });
});

module.exports = router
