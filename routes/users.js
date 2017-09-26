var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');

const jwt = require('jwt-simple');
const User = require('../models/user');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, function(req, res, next) {
  User.find().exec(function(err,users){
    res.json(users);
  })
});

router.delete('/', requireAuth, function(req, res, next) {
  var id = req.body.id;
  User.findOne({_id: id}).exec(function(err,user){
    if (err) res.status(422).send({ error: err});
    User.remove({_id: id}).exec(function(err,result){
      if (err) res.status(422).send({ error: err});
      res.json(result);
    });
  })
});

module.exports = router;

// .delete(function(req, res) {
//     Fleet.remove({
//       _id: req.params.fleet_id
//     }, function(err, fleet) {
//       if (err) res.send(err);
//       res.json({ message: 'Successfully deleted' });
//     });
//   });
