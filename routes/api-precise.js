var moment = require('moment');
var _ = require('underscore');
var Fleet = require('../models/fleet');
var TripData = require('../models/tripdata');
var preciseSOAPXML = require('../js/preciseSOAPXML');

var express = require('express');
var router = express.Router();

// var logger = require('logfmt');
// var jackrabbit = require('jackrabbit');
// var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
// var exchange = rabbit.default();
// var queue = exchange.queue({ name: 'tripdata' });

// Authenticate all routes.
var passport = require('passport');
var User = require('../models/user');
// router.use(passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' }))
router.use(function (req, res, next) {
  // return next();

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
});

function ToInt32(x) {
  return ("0x" + x) | 0;
};

tripData2Time = function(tripDataString) {
  var timeString = tripDataString.substr(tripDataString.length - 8);
  var seconds = parseInt(timeString, 16);
  var oldDateObject = new Date("2000-03-01T00:00:00Z");
  var newDateObject = new Date(oldDateObject.getTime() + seconds/60*60000);
  return newDateObject
};

tripData2LatLon = function(tripDataString) {
  // console.log(tripDataString);
  var tempLat = ToInt32(tripDataString.substring(0, 6));
  var latitude = (tempLat / 60000.0).toFixed(5);
  var tempLon = ToInt32(tripDataString.substring(6, 14));
  var longitude = (tempLon / 60000.0).toFixed(5);
  return [longitude,latitude];
};

router.route('/tripdata')

  // get all the fleet (accessed at GET http://localhost:3000/api/fleet)
  .get(function(req, res) {
    TripData.find(function(err, tripdata) {
      if (err) res.send(err);
      res.json(tripdata);
    });
  })

// router.route('/tripdata/test')
//
//   // get all the fleet (accessed at GET http://localhost:3000/api/fleet)
//   .get(function(req, res) {
//     TripData.find(function(err, tripdata) {
//       tripdata = tripdata[10];
//       if (err) res.send(err);
//       var lonlat = tripData2LatLon(tripdata.TripData);
//       var latitude = 0;
//       var longitude = 0;
//       res.json({tripDataString: tripdata.TripData, lonlat: lonlat, longitude: longitude, latitude: latitude, tripdata: tripdata});
//     });
//   })

router.route('/tripdata/remove')

  // get all the fleet (accessed at GET http://localhost:3000/api/fleet)
  .get(function(req, res) {
    TripData.remove(function(err,removed) {
      // console.log(removed + "records removed.");
     // where removed is the count of removed documents
     res.json({count: removed});
    });
  })

router.route('/fleet')

  // get all the fleet (accessed at GET http://localhost:3000/api/fleet)
  .get(function(req, res) {
    Fleet.find(function(err, fleet) {
      if (err) res.send(err);
      res.json(fleet);
    });
  })

  // create a fleet (accessed at POST http://localhost:3000/api/fleet)
  .post(function(req, res) {
    var fleet = new Fleet();      // create a new instance of the fleet model
    fleet.name = req.body.name;  // set the fleet name (comes from the request)

    // save the fleet and check for errors
    fleet.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Fleet created!' });
    });
  });

router.route('/fleet/:fleet_id')

  // get the fleet with that id (accessed at GET http://localhost:3000/api/fleet/:fleet_id)
  .get(function(req, res) {
    Fleet.findById(req.params.fleet_id, function(err, fleet) {
      if (err) res.send(err);
      res.json(fleet);
    });
  })

  // update the fleet with this id (accessed at PUT http://localhost:3000/api/fleet/:fleet_id)
  .put(function(req, res) {
    // use our fleet model to find the fleet we want
    Fleet.findById(req.params.fleet_id, function(err, fleet) {
      if (err) res.send(err);
      fleet.name = req.body.name;  // update the fleet info
      // save the fleet
      fleet.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Fleet updated!' });
      });
    });
  })

  // delete the fleet with this id (accessed at DELETE http://localhost:8080/api/fleet/:fleet_id)
  .delete(function(req, res) {
    Fleet.remove({
      _id: req.params.fleet_id
    }, function(err, fleet) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

router.route('/precise/GetCompanyDataWithRowCount')

  .get(function(req, res) {
    var username = process.env.PRECISE_USERNAME;
    var password = process.env.PRECISE_PASSWORD;
    var now = Date.now();
    // 'YYYY-MM-DD HH:mm:ss'
    // var startUTC = moment(now).utc().format("YYYY-MM-DDTHH:mm:ss");
    // var endUTC = moment(now).subtract(3,'hours').utc().format("YYYY-MM-DDTHH:mm:ss");
    var startUTC = moment(now).utc().format();
    var endUTC = moment(now).subtract(12,'hours').utc().format();
    // var startUTC = moment(firstDayOfMonth).format("YYYY-MM-DD") + "T00:00:00.00Z";
    console.log("startUTC: " + startUTC);
    console.log("endUTC: " + endUTC);
    var rowCount = 100;
    preciseSOAPXML.GetCompanyDataWithRowCount(endUTC, startUTC, rowCount, username, password, function(result){
      res.json(result);
    });
    // res.json(endUTC);
  })

router.route('/precise/GetCompanyDataByDatabaseCreatedTime')

  .get(function(req, res) {
    console.log("GetCompanyDataByDatabaseCreatedTime");
    var username = process.env.PRECISE_USERNAME;
    var password = process.env.PRECISE_PASSWORD;
    var startUTC = moment(Date.now()).subtract({hours: 3}).utc().format();
    var endUTC = moment(Date.now()).utc().format();
    preciseSOAPXML.GetCompanyDataByDatabaseCreatedTime(startUTC, endUTC, username, password, function(result){
      console.log("GetCompanyDataByDatabaseCreatedTime Last 3 Hours # of Results: " + result.length);
      var tripDataReduced = _.chain(result)
                .groupBy(function(trip){
                  return trip.AssetName;
                })
                .map(function(values, key){

                  var gpsValues = _.filter(values,function(gps){return ["aFE00","aFE01","rFE01","cFD00","cFD01","cFD02","rDF01","rDF0C"].indexOf(gps.RecordType) == -1;})
                  return {AssetName: key, currentTrip: _.last(_.sortBy(gpsValues,'ReportDateTime'))};
                })
                // .sortBy(function(d){
                //   d.value
                // })
                .value()
      res.json(tripDataReduced);
    });
    // // res.json({startUTC: startUTC, endUTC: endUTC});
  })

router.route('/precise/GetAssetsLastLocation')

  .get(function(req, res) {
    console.log("GetAssetsLastLocation");
    var username = process.env.PRECISE_USERNAME;
    var password = process.env.PRECISE_PASSWORD;
    var startUTC = moment(Date.now()).subtract({hours: 12}).utc().format();
    var endUTC = moment(Date.now()).utc().format();
    preciseSOAPXML.GetCompanyDataByDatabaseCreatedTime(startUTC, endUTC, username, password, function(result){
      console.log("GetCompanyDataByDatabaseCreatedTime Last 3 Hours # of Results: " + result.length);
      var tripDataReduced = _.chain(result)
                .groupBy(function(trip){
                  return trip.AssetName;
                })
                .map(function(values, key){

                  var gpsValues = _.filter(values,function(gps){return ["aFE00","aFE01","rFE01","cFD00","cFD01","cFD02","rDF01","rDF0C"].indexOf(gps.RecordType) == -1;})
                  return {AssetName: key, currentTrip: _.last(_.sortBy(gpsValues,'ReportDateTime'))};
                })
                // .sortBy(function(d){
                //   d.value
                // })
                .value()
      res.json(tripDataReduced);
    });
    // // res.json({startUTC: startUTC, endUTC: endUTC});
  })

// GetPreCiseQueryInfo - deviceIdentifier,startUtc,endUtc,username,password,callback
// router.route('/precise/rabbitpublish')
//
//   .get(function(req, res) {
//     exchange.publish('Hello World!', { key: 'tripdata' });
//     // exchange.on('drain', process.exit);
//     res.json({message: "success"});
//   });

module.exports = router;

// var dummyCompanyData = [
// {
// "AssetName": "3213 2TON",
// "currentTrip": {
//   "AssetName": "3213 2TON",
//   "RecordType": "aFE01",
//   "TripData": "0200000777E60000C3A50001E785",
//   "Misc": "",
//   "ReportDateTime": "2016-10-19T18:27:08",
//   "UniqueID": "FE00_4325786895"
// }
// },
// {
// "AssetName": "3424 12INT",
// "currentTrip": {
//   "AssetName": "3424 12INT",
//   "RecordType": "aFE01",
//   "TripData": "02210069B1270009F2590013CC96",
//   "Misc": "",
//   "ReportDateTime": "2016-10-18T21:14:00",
//   "UniqueID": "FE00_4324256961"
// }
// },
// {
// "AssetName": "3202 15INT",
// "currentTrip": {
//   "AssetName": "3202 15INT",
//   "RecordType": "rDF0F",
//   "TripData": "24959DFF9FCAA98600111F4B5ED2",
//   "Misc": "",
//   "ReportDateTime": "2016-10-19T18:32:50",
//   "UniqueID": "DFGPS_4297697378"
// }
// },
// {
// "AssetName": "3261 SWEEP",
// "currentTrip": {
//   "AssetName": "3261 SWEEP",
//   "RecordType": "aFE00",
//   "TripData": "0000003872C30004F68F001443E8",
//   "Misc": "",
//   "ReportDateTime": "2016-10-19T15:46:21",
//   "UniqueID": "FE00_4325234788"
// }
// },
// {
// "AssetName": "3216 2TON",
// "currentTrip": {
//   "AssetName": "3216 2TON",
//   "RecordType": "aFE01",
//   "TripData": "02000005004B00006BD50000DB4C",
//   "Misc": "",
//   "ReportDateTime": "2016-10-19T14:07:06",
//   "UniqueID": "FE00_4324898873"
// }
// }
// ];
