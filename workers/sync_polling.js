require ('dotenv').config();

var Fleet = require('../models/fleet');
var TripData = require('../models/tripdata');

var http = require('http');
var crypto = require('crypto');

var jackrabbit = require('jackrabbit');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = mongoose.connect(process.env.LAPTOP_MONGODB_URI);

var jackrabbit = require('jackrabbit');
var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
var exchange = rabbit.default();
var tripdata_queue = exchange.queue({ name: 'tripdata_queue' });

// router.get('/sync/:fleet_id', function(req, res, next) {
//   var fleet_id = parseInt(req.params.fleet_id);
//   if (req.query.month) {
//     exchange.publish({fleet_id: fleet_id, year: req.query.year, month: req.query.month}, { key: 'tripdata' });
//     // new TripDataSyncLog({datetime: Date(), fleet_id: fleet_id, year: req.query.year, month: req.query.month, status: 0}).save();
//   } else {
//     _.each([0,1,2,3,4,5,6,7,8,9,10,11],function(month){
//       exchange.publish({fleet_id: fleet_id, year: req.query.year, month: month}, { key: 'tripdata' });
//       // new TripDataSyncLog({datetime: Date(), fleet_id: fleet_id, year: req.query.year, month: month, status: 0}).save();
//     });
//   };
//   res.redirect('/fleet/' + fleet_id);
// });

const initTripData = () => {
  Fleet.find().exec((err,foundFleet) => {
    if (err) console.log(err);
    console.log(foundFleet)
    foundFleet.forEach((fleet) => {
      ["2015","2016","2017","2018"].forEach((year) => {
        [0,1,2,3,4,5,6,7,8,9,10,11].forEach((month) => {
          exchange.publish({fleet_id: fleet.AssetID, year: year, month: month}, { key: 'tripdata' });
          // new TripDataSyncLog({datetime: Date(), fleet_id: fleet_id, year: req.query.year, month: month, status: 0}).save();
        });
      });
    });
  });
}

// const pollTripData = () => {
//   TripData.find().exec((err,foundTripData) => {
//     if (err) console.log(err);
//     if (foundTripData.length === 0) return initTripData();
//     console.log("TODO: Enable Polling.....");
//     return true;
//   })
// }

// pollTripData();

initTripData();
