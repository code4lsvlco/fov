require ('dotenv').config();

var Fleet = require('../models/fleet');
var TripData = require('../models/tripdata');
var SegmentData = require('../models/segmentdata');

var preciseAsset = require('../js/preciseAsset');
var turf = require('turf');

var _ = require('underscore');
var moment = require('moment');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// process.env.LAPTOP_MONGODB_URI="mongodb://localhost:27017/snowtracker"
var db = mongoose.connect(process.env.LAPTOP_MONGODB_URI);

// var jackrabbit = require('jackrabbit');
// var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
// var exchange = rabbit.default();
//
// var segmentDataQueue = exchange.queue({ name: 'segmentdata' });
// segmentDataQueue.consume(processSegments, { noAck: true });

processSegments = function(data){
  Fleet.findOne({AssetID: data.fleet_id}, function (err, vehicle){
    if (err) console.log(err);
    console.log(vehicle);
    // , UniqueID: { $in: data.uids2Process }
    TripData.find({Asset_id: vehicle.id, RecordType: { $in: ['rDF0D','rDF0C'] }}).sort({ 'ReportDateTime': 1 }).exec(function(err,trips){
      if (err) console.log(err);
      console.log(trips.length);
      try {
        console.log("First Trip Time:" + trips[0].ReportDateTime);
        console.log("Last Trip Time:" + trips[trips.length - 1].ReportDateTime);
      }
      catch(e){};
      // var preciseVehicle = new preciseAsset(vehicle,trips);
      // console.log(preciseVehicle);
      var segments = {
        base: {},
        input_1: [],
        input_2: [],
        input_3: [],
        input_4: [],
        input_5: [],
        input_6: [],
        input_secondary: [],
      }; // base, input, secondary
      var inputStatus = {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        secondary: {}
      };

      var validateLatLon = function (lat,lon){
        if (!((lat > -90.0) && (lat < 90.0))) return false;
        if (!((lon > -180.0) && (lon < 180.0))) return false;
        return true;
      };

      // var segmentInformation = "";
      // var segmentsInputOneOn = [];
      // var inputOneOn = false;
      var igOffTR = trips;
      _.each(igOffTR, function(trip, i){
        // console.log("Trip #: " + (i + 1) + " - " + trip.RecordTypeName + " - "+ moment(new Date(trip.RecordDateTime)).format("YYYY-MM-DD - hh:mm:ss A"));
        if (i == (igOffTR.length - 1)) return false;

        if (igOffTR[i].RecordType == "rDF0C" && igOffTR[i+1].RecordType == "rDF0D") {
          var startRecordDateTime = new Date(igOffTR[i].RecordDateTime)
          var endRecordDateTime = new Date(igOffTR[i+1].RecordDateTime);
          // console.log("Start/Off - " + startRecordDateTime + " - " + endRecordDateTime);
          TripData.find({Asset_id: vehicle.id, RecordDateTime: { $gte: startRecordDateTime, $lte: endRecordDateTime }})
                  .sort({ 'ReportDateTime': 1 })
                  .exec(function(err,segmentTrips){
            if (err) console.log(err);
            // // TODO: create a duration to hours/minutes string module.
            var start = moment(new Date(segmentTrips[0].RecordDateTime)); //todays date
            var finish = moment(new Date(segmentTrips[segmentTrips.length-1].RecordDateTime)); // another date
            var duration = moment.duration(finish.diff(start));
            var segment = {"type": "LineString", "coordinates": []};
            _.each(segmentTrips, function(trip){
              if (validateLatLon(trip.Latitude,trip.Longitude)){
                segment.coordinates.push([trip.Longitude,trip.Latitude])
              };
            });

            var length = 0;
            try {
              var length = turf.lineDistance(segment, 'miles').toFixed(2);
            }
            catch(err) {
              console.log(err)
              console.log(segment)
              var length = 0;
            };

            var lineSegment = {
              "type": "Feature",
              "properties": {
                start: start,
                finish: finish,
                duration: duration,
                length: length
              },
              "geometry": segment
            };

            var fc = {
              "type": "FeatureCollection",
              "features": lineSegment
            };

            var newSegementData = new SegmentData({
              AssetID: vehicle.AssetID,
              segment_id: vehicle.id + "-" + _.first(segmentTrips).id + "-" + _.last(segmentTrips).id,
              partial: false,
              startDateTime: _.first(segmentTrips).RecordDateTime,
              endDateTime: _.last(segmentTrips).RecordDateTime,
              duration: duration.asMinutes(),
              length: length,
              feature_collections: {base: fc}})

            newSegementData.save(function(err,savedSegment){
              if (err) console.log(err);
              // console.log(savedSegment);
            });

          });
        };


        // var sortedBeforeTrips = _.sortBy(beforeTrips, function(trip){return new Date(trip.RecordDateTime)});
        // if (sortedBeforeTrips.length == 0) return;
        //

        //

        //

        //

        //
        // // console.log(lineSegment);
        //


        // segmentInformation = segmentInformation +
        //                      "<li class='list-group-item' style='padding-bottom: 10px;'>" +
        //                        "<div>"+
        //                            start.format("dddd, MMMM Do YYYY") +
        //                            "<div>" + start.format("h:mm a") + " - " + finish.format("h:mm a") + "</div>" +
        //                            "<div>" + strTime + "</div>" +
        //                            "<div>" + length + " miles<div>" +
        //                           //-  "<input type='hidden' value='" + timestamp + "'>"
        //                            "<div>" + "(<a href='/fleet/map/" + trip.AssetID + "?range=hours&from=" + start.toJSON() + "&to=" + finish.toJSON() + "'>View</a>)" + "</div>" +
        //                         "</div>" +
        //                      "</li>"
      });

    });

  });
  return true;
};

// segments2FeatureCollection = function(segments){
//   fc = {
//     "type": "FeatureCollection",
//     "features": segments
//   };
//   return fc;
// }

// getMapBBOX = function(points){
//   // return turf.bbox(vehicleGeoJsonTripPoints);
//   return turf.bbox(points);
//
//   //////////
//   // Place this code in the client to set the map bounding box.
//   // map.fitBounds([
//   //   [bbox[1],bbox[0]],
//   //   [bbox[3],bbox[2]]
//   // ]);
//   //////////
// };

var data = {fleet_id: "11180"}
processSegments(data);
console.log(SegmentData.find().count());
