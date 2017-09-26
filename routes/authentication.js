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

router.post('/signin', requireSignin, function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const given_name = req.body.given_name;
  const family_name = req.body.family_name;
  let role = "Viewer";

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User.find().exec(function(err,users){
    if (users.length == 0) role = "Administrator";

    User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      if (existingUser) {
        // return res.status(422).send({ email: 'Email is in use' });
        return res.status(422).send({ email: 'Email is already in use.' });
      }

      const user = new User({
        email: email,
        password: password,
        given_name: given_name,
        family_name: family_name,
        role: role
      });

      user.save(function(err) {
        if (err) { return next(err); }
        res.json({ token: tokenForUser(user) });
      });
    });
  });

});

module.exports = router
