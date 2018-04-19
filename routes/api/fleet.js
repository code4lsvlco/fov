var express = require('express');
var router = express.Router();

var Fleet = require('../../models/fleet');
var TripData = require('../../models/tripdata');
var TripSegment = require('../../models/segmentdata');

var preciseSOAPXML = require('../../services/preciseSOAPXML');

router.get('/', function(req, res, next) {
  var username = process.env.PRECISE_USERNAME;
  var password = process.env.PRECISE_PASSWORD;
  if (!username || !password) return res.status(422).send({ error: "Precise MRM Username and/or Password undefined." });
  preciseSOAPXML.AssetList(username,password,function(preciseAssetList){
    preciseAssetList.forEach(function(asset){
      Fleet.findOne({ AssetID: asset.AssetID }, function (err, foundAsset) {
        if (err) { return next(err); }
        if (foundAsset) {
          var foundAssetLastMod = Math.round(+new Date(foundAsset.LastMod)/1000);
          var assetLastMod = Math.round(+new Date(asset.LastMod)/1000);
          if (foundAssetLastMod != assetLastMod) {
            Fleet.findByIdAndUpdate(foundAsset._id, { $set: asset}, { new: true }, function (err, updatedFleet) {
              if (err) { return next(err); }
            });
          };
        } else {
          var fleet = new Fleet(asset);
          fleet.save(function (err) {
            if (err) { return next(err); }
          })
        };
      })
    });
    Fleet.find().exec(function (err, foundFleet) {
      if (err) { return next(err); }
      return res.json(foundFleet);
    });
  });
});

router.get("/:Asset_id/tripdata/groupby/reportdatetime",(req,res,next) => {
  const Asset_id = req.params.Asset_id;
  // console.log(Asset_id);
  // console.log(TripData.find({Asset_id: Asset_id}).count().exec());
  // TripData.find({Asset_id: Asset_id}).count().exec((err,results) => {
  //   // console.log(results.length);
  //   // res.json({AssetID: AssetID, tripdataLength: results.length});
  //   res.json({err: err, results: results});
  // });
  TripData.aggregate([{ $match: {
                          Asset_id: Asset_id
                      }},
                      { $group : {
                          _id : { year: { $year : "$ReportDateTime" }, month: { $month : "$ReportDateTime" }, day: { $dayOfMonth : "$ReportDateTime" }
                        },
                        count : { $sum : 1 }}
                      }],
                      function(err,trips) {
    if (err) { return next(err); }

    function pad(n) {
      return (n < 10) ? ("0" + n) : n;
    }

    var tripFrequencyData = []; //'2017-01-09T23:59:59.000Z'
    trips.forEach((trip) => {
      tripFrequencyData.push({date: trip._id.year + "-" + pad(trip._id.month) + "-" + pad(trip._id.day) + "T23:59:59.000Z", count: trip.count });
    });
    res.json(tripFrequencyData);
    // res.render('fleet/show', { title: vehicle.AssetName + " Sync Status", AssetID: vehicle.AssetID, vehicle: JSON.stringify(vehicle), tripFrequencyData: JSON.stringify(tripFrequencyData) });
  });
})

// router.get('/sync/:fleet_id/all', function(req, res, next) {
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

module.exports = router;
