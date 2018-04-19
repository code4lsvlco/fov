require ('dotenv').config();

var Fleet = require('../models/fleet');
var TripData = require('../models/tripdata');

var preciseAsset = require('../services/preciseAsset');
var preciseSOAPXML = require('../services/preciseSOAPXML');

var http = require('http');
var crypto = require('crypto');
var _ = require('underscore');
var moment = require('moment');
// var logger = require('logfmt');
var jackrabbit = require('jackrabbit');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = mongoose.connect(process.env.LAPTOP_MONGODB_URI);
    // .on('connected', function() {
    //   logger.log({ type: 'info', msg: 'connected', service: 'mongodb' });
    //   ready();
    // })
    // .on('error', function(err) {
    //   logger.log({ type: 'error', msg: err, service: 'mongodb' });
    // })
    // .on('close', function(str) {
    //   logger.log({ type: 'error', msg: 'closed', service: 'mongodb' });
    // })
    // .on('disconnected', function() {
    //   logger.log({ type: 'error', msg: 'disconnected', service: 'mongodb' });
    //   lost();
    // });

// var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
    // .on('connected', function() {
    //   logger.log({ type: 'info', msg: 'connected', service: 'rabbitmq' });
    //   ready();
    // })
    // .on('error', function(err) {
    //   logger.log({ type: 'error', msg: err, service: 'rabbitmq' });
    // })
    // .on('disconnected', function() {
    //   logger.log({ type: 'error', msg: 'disconnected', service: 'rabbitmq' });
    //   lost();
    // });

var exchange = rabbit.default();

var tripDataQueue = exchange.queue({ name: 'tripdata' });
tripDataQueue.consume(syncFleet, { noAck: true });

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

tripData2Heading = function(tripDataString) {
  var tempHeading = tripDataString.substring(14, 16);
  var heading = tempHeading * 2;
  return heading;
};

tripData2Speed = function(tripDataString) {
  var tempSpeed = tripDataString.substring(16, 20);
  var speedMPH = tempSpeed * 2.237;
  return speedMPH;
};

function preciseTripToColTrip(trip,asset){
  trip.AssetID = asset.AssetID;
  trip.DeviceICCID = asset.DeviceICCID;
  trip.Asset_id = asset._id.toString();
  trip.ReportDateTime = new Date(trip.ReportDateTime);
  var tripData = trip.TripData;
  trip.RecordDateTime = new Date(tripData2Time(tripData));
  var eventCodes = ["rDF0A","rDF0B","rDF0E","rDF0F","rDF10",
                    "rDF01","rDF02","rDF03","rDF04","rDF05",
                    "rDF06","rDF07","rDF0D","rDF20","rDF21",
                    "rDF22","rDF23","rDF24","rDF25","rDF26",
                    "rDF27","rDF2A","rDF2B","rDF2C","rDF2D",
                    "rDF2E","rDF2F"];
  if (eventCodes.indexOf(trip.RecordType) > -1) {
    var tripDataLonLat = tripData2LatLon(tripData);
    trip.LonLat = tripDataLonLat;
    trip.Latitude = tripDataLonLat[1];
    trip.Longitude = tripDataLonLat[0];
    trip.Heading = tripData2Heading(tripData);
    trip.Speed = tripData2Speed(tripData);
    var inputStatus = [false,false,false,false,false,false]
    switch(trip.RecordType) {
      case "rDF21":
        inputStatus[0] = true;
        break;
      case "rDF23":
        inputStatus[1] = true;
        break;
      case "rDF25":
        inputStatus[2] = true;
        break;
      case "rDF27":
        inputStatus[3] = true;
        break;
      case "rDF2D":
        inputStatus[4] = true;
        break;
      case "rDF2F":
        inputStatus[5] = true;
        break;
      // default:
          // Nothing
    }
    trip.InputOnStatus = inputStatus;
  };
  return trip
};

function syncFleet(data) {

  console.log('syncFleet received the following data:');
  console.log(data);

  Fleet.findOne({AssetID: data.fleet_id}, function (err, foundAsset){
    if (err) res.send(err);

    console.log(foundAsset);

    // TripData.find({AssetID: foundAsset.AssetID}).exec(function(err, foundTripData){
      // if (err) res.send(err);
      //
      // var localTripData = [];
      // console.log("foundTripData Length: " + foundTripData.length);

    // Get Precise login information.
    var username = process.env.PRECISE_USERNAME;
    var password = process.env.PRECISE_PASSWORD;

    // Get the year and month passed from the router.
    var year = parseInt(data.year);
    var month = parseInt(data.month);

    // Create date objects from the browser.
    var fromDate = new Date(year,month,1);
    var toDate = new Date(year,month,1);
    console.log("Sync From Date: " + fromDate);
    console.log("Sync To Date: " + toDate);

    // Retrieve by Day
    // for (var d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
      // Dates to Get by Day
      // var startUTC = moment(new Date(d)).format("YYYY-MM-DD") + "T00:00:00.00Z";
      // var endUTC = moment(new Date(d)).format("YYYY-MM-DD") + "T23:59:59.00Z";

    // Retrieve by Month
    for (var d = fromDate; d <= toDate; d.setMonth(d.getMonth() + 1)) {

      // Dates to Get by Month
      var firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
      var startUTC = moment(firstDayOfMonth).format("YYYY-MM-DD") + "T00:00:00.00Z";
      var lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      var endUTC = moment(lastDayOfMonth).format("YYYY-MM-DD") + "T23:59:59.00Z";

      console.log ("Precise SOAP XML Query date range:");
      console.log(startUTC + " - " + endUTC);

      var execTime = [];
      var t0 = Date.now();
      preciseSOAPXML.GetAssetData(foundAsset.DeviceICCID,startUTC,endUTC,username,password,function(preciseTripData){
        // console.log("Test");
        // console.log(preciseTripData);
        // if (preciseTripData === null) {
        //   console.log("preciseTripData === null");
        //   return true;
        // }
        var t1 = Date.now();
        execTime.push("GetAssetData Query: " + (t1 - t0) + " milliseconds.");
        // Example Trip Object
        // {
        // "AssetName": "3261 SWEEP",
        // "RecordType": "rDF0C",
        // "TripData": "01424C205645520105001F35F713",
        // "Misc": "",
        // "ReportDateTime": "2016-10-03T12:52:35",
        // "UniqueID": "DFON_3118020207"
        // }
        var preciseUIDS = _.map(preciseTripData,"UniqueID");
        console.log("preciseUIDS Count: " + preciseUIDS.length);

        TripData.find({UniqueID: { $in: preciseUIDS }}).exec(function(err, foundTripData){
          console.log("found UniqueID Trip Data Count: " + foundTripData.length);
          var t2 = Date.now();
          execTime.push("TripData Find $in preciseUIDS: " + (t2 - t1) + " milliseconds.");
          if (err) res.send(err);
          var colUIDS = _.map(foundTripData,"UniqueID");
          console.log("colUIDS Count: " + colUIDS.length);
          var uidsToInsert = _.difference(preciseUIDS,colUIDS);
          console.log("uidsToInsert Count: " + uidsToInsert.length);
          var filteredPreciseTripData = [];
          _.each(preciseTripData,function(trip){
            if (uidsToInsert.indexOf(trip.UniqueID) > -1) {
              filteredPreciseTripData.push(preciseTripToColTrip(trip,foundAsset));
            };
          });
          console.log("Bulk Filtered Trip Data Count: " + filteredPreciseTripData.length);
          if (filteredPreciseTripData.length === 0) {
            console.log("Bulk Filtered Trip Data is Empty - No Batch Insert Attemped.")
            return;
          }
          var t3 = Date.now();
          execTime.push("Converted precise to col TripData: " + (t3 - t2) + " milliseconds.");
          TripData.collection.insert(filteredPreciseTripData,function(err,newTripData){
            if (err) console.log(err);
            console.log("Batch TripData Insert Completed")
            if (newTripData) console.log("TripData Count: " + newTripData.insertedCount);
            var t4 = Date.now();
            execTime.push("Total time to Process: " + (t4 - t0) + " milliseconds.");
            console.log(execTime);
            // uidsToInsert
            // exchange.publish({fleet_id: data.fleet_id, uids2Process: uidsToInsert}, { key: 'segmentdata' });
          });
        });
      });
    };
    // });
  });
};

            // TripData.findOne({UniqueID: preciseTrip.UniqueID}, function(err, foundTrip){
            //   // console.log("Into the Tripdata segment");
            //   if (foundTrip) {
            //     // console.log("found a trip");
            //     // console.log(foundTrip);
            //   } else {
            //     // console.log(did not find a trip);
            //     var trip = new TripData();
            //     trip.AssetID = foundAsset.AssetID;
            //     trip.DeviceICCID = foundAsset.DeviceICCID;
            //     trip.Asset_id = foundAsset._id;
            //     trip.AssetName = preciseTrip.AssetName;
            //     trip.RecordType = preciseTrip.RecordType;
            //     trip.TripData = preciseTrip.TripData;
            //     trip.Misc = preciseTrip.Misc;
            //     trip.ReportDateTime = new Date(preciseTrip.ReportDateTime).toUTCString();
            //     trip.UniqueID = preciseTrip.UniqueID;
            //     trip.save(function (err) {if (err) res.send(err);});
            //   };
            //   // res.redirect('/fleet/' + foundAsset.AssetID);
            //   // return;
            // });
