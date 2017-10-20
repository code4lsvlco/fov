// { AssetID: 11180,
//   AssetName: '3261 SWEEP',
//   AssetDesc: 'Sweeper',
//   Fleet: 'Louisville',
//   DeviceMacID: '',
//   DeviceICCID: '89014103257748618045',
//   AssetSwitches:
//    [ { Description: 'Sweeper',
//        SwitchNumber: 1,
//        OffLabel: 'OFF',
//        OnLabel: 'ON',
//        IsAvailability: false } ],
//   TripData:
//    [ { RecordType: 'rDF0D',
//        TripData: '249557FF9FC4840E00001F3123F6',
//        Latitude: '39.95878',
//        Longitude: '-105.1114',
//        Heading: '28',
//        Speed: '0',
//        RecordDateTime: '2016-09-29T21:02:46',
//        Misc: '',
//        InputOnStatus: 'False,False,False,False,False,False',
//        ReportDateTime: '2016-09-29T21:02:46',
//        UniqueID: 'DFGPS_4271732554' },

// Precise MRM AssetList
// { AssetID: 10993,
      //   AssetName: '3213 2TON',
      //   AssetDesc: '2 TON',
      //   Fleet: 'Louisville',
      //   DeviceMacID: '',
      //   DeviceICCID: '89011704252318989719',
      //   LastMod: '2016-09-30T14:36:34.95' }
      // { AssetSwitchID: 8155,
      //   AssetID: 10995,
      //   Description: 'Plow',
      //   SwitchNumber: 1,
      //   OffLabel: 'UP',
      //   OnLabel: 'DOWN',
      //   IsAvailability: false }

var _ = require('underscore');

module.exports = function(asset,trips) {

  assignTripRecords = function(){
    var rows = that.Trips;
    var accumulatorRecords = [];
    var configurationRecords = [];
    var powerRecords = [];
    var tripEventTimeRecords = [];
    var tripEventDistanceRecords = [];
    var tripEventSecondaryRecords = [];
    var tripEventAngleChangeRecords = [];
    var tripEventStopResumeRecords = [];
    var tripExcessiveSpeedRecords = [];
    var tripGPSSignalsRecords = [];
    var tripStationaryPointRecords = [];
    var tripSystemOffRecords = [];
    var tripInput1Records = [];
    var tripInput2Records = [];
    var tripInput3Records = [];
    var tripInput4Records = [];
    var tripInput5Records = [];
    var tripInput6Records = [];
    var tripIgnitionOffRecords = [];
    var tripIgnitionOnRecords = [];
    // var tripNonEventRecords = [];
    var tripVoltageRecords = [];
    var otherRecords = [];
    _.each(rows, function(row){
      // console.log(row.RecordType);
      var rt = row.RecordType;
      if (rt == "aFE00" || rt == "aFE01" || rt == "rFE01") {
        accumulatorRecords.push(row);
        return;
      };
      if (rt == "cFD00" || rt == "cFD01" || rt == "cFD02") {
        configurationRecords.push(row);
        return;
      };
      if (rt == "rDF01" || rt == "rDF0C") {
        powerRecords.push(row);
        return;
      };
      if (rt == "rDF0A") {
        tripEventTimeRecords.push(row);
        return;
      };
      if (rt == "rDF0B") {
        tripEventDistanceRecords.push(row);
        return;
      };
      if (rt == "rDF0E") {
        tripEventSecondaryRecords.push(row);
        return;
      };
      if (rt == "rDF0F") {
        tripEventAngleChangeRecords.push(row);
        return;
      };
      if (rt == "rDF10") {
        tripEventStopResumeRecords.push(row);
        return;
      };
      if (rt == "rDF02" || rt == "rDF03") {
        tripExcessiveSpeedRecords.push(row);
        return;
      };
      if (rt == "rDF04" || rt == "rDF05") {
        tripGPSSignalsRecords.push(row);
        return;
      };
      if (rt == "rDF06" || rt == "rDF07") {
        tripStationaryPointRecords.push(row);
        return;
      };
      if (rt == "rDF0D") {
        tripSystemOffRecords.push(row);
        return;
      };
      if (rt == "rDF20" || rt == "rDF21") {
        tripInput1Records.push(row);
        return;
      };
      if (rt == "rDF22" || rt == "rDF23") {
        tripInput2Records.push(row);
        return;
      };
      if (rt == "rDF24" || rt == "rDF25") {
        tripInput3Records.push(row);
        return;
      };
      if (rt == "rDF26" || rt == "rDF27") {
        tripInput4Records.push(row);
        return;
      };
      if (rt == "rDF2A") {
        tripIgnitionOffRecords.push(row);
        return;
      };
      if (rt == "rDF2B") {
        tripIgnitionOnRecords.push(row);
        return;
      };
      if (rt == "rDF2C" || rt == "rDF2D") {
        tripInput5Records.push(row);
        return;
      };
      if (rt == "rDF2E" || rt == "rDF2F") {
        tripInput6Records.push(row);
        return;
      };
      if (rt == "rDF11") {
        tripVoltageRecords.push(row);
        return;
      };
      otherRecords.push(row);
      // console.log(rt);
    });
    that.Trips = rows.length;
    that.accumulatorRecords = accumulatorRecords;
    that.configurationRecords = configurationRecords;
    that.powerRecords = powerRecords;
    // // _.each(powerRecords,function(r){
    // //   // console.log(r.TripData);
    // //   console.log(tripData2Time(r.TripData));
    // // });
    that.tripEventTimeRecords = tripEventTimeRecords;
    that.tripEventDistanceRecords = tripEventDistanceRecords;
    that.tripEventSecondaryRecords = tripEventSecondaryRecords;
    that.tripEventAngleChangeRecords = tripEventAngleChangeRecords;
    that.tripEventStopResumeRecords = tripEventStopResumeRecords;
    that.tripExcessiveSpeedRecords = tripExcessiveSpeedRecords;
    that.tripGPSSignalsRecords = tripGPSSignalsRecords;
    that.tripStationaryPointRecords = tripStationaryPointRecords;
    that.tripSystemOffRecords = tripSystemOffRecords;
    that.tripInput1Records = tripInput1Records;
    that.tripInput2Records = tripInput2Records;
    that.tripInput3Records = tripInput3Records;
    that.tripInput4Records = tripInput4Records;
    that.tripInput5Records = tripInput5Records;
    that.tripInput6Records = tripInput6Records;
    that.tripIgnitionOffRecords = tripIgnitionOffRecords;
    that.tripIgnitionOnRecords = tripIgnitionOnRecords;
    that.tripVoltageRecords = tripVoltageRecords;
    that.otherRecords = otherRecords;

    console.log("accumulatorRecords: " + accumulatorRecords.length);
    console.log("configurationRecords: " + configurationRecords.length);
    console.log("powerRecords: " + powerRecords.length);
    console.log("tripEventTimeRecords: " + tripEventTimeRecords.length);
    console.log("tripEventDistanceRecords: " + tripEventDistanceRecords.length);
    console.log("tripEventSecondaryRecords: " + tripEventSecondaryRecords.length);
    console.log("tripEventAngleChangeRecords: " + tripEventAngleChangeRecords.length);
    console.log("tripEventStopResumeRecords: " + tripEventStopResumeRecords.length);
    console.log("tripExcessiveSpeedRecords: " + tripExcessiveSpeedRecords.length);
    console.log("tripGPSSignalsRecords: " + tripGPSSignalsRecords.length);
    console.log("tripStationaryPointRecords: " + tripStationaryPointRecords.length);
    console.log("tripSystemOffRecords: " + tripSystemOffRecords.length);
    _.each(that.tripSystemOffRecords,function(r){
      // console.log(r.RecordType + ": " + tripData2Time(r.TripData));
    });
    console.log("tripIgnitionOffRecords: " + tripIgnitionOffRecords.length);
    _.each(that.tripIgnitionOffRecords,function(r){
      // console.log(r.RecordType + ": " + tripData2Time(r.TripData));
      var before = _.filter(rows, function(row){ return row.RecordDateTime < r.RecordDateTime; });
      // console.log("Before: " + before.length);
    });
    console.log("tripVoltageRecords: " + tripVoltageRecords.length);
    console.log("tripInput1Records: " + tripInput1Records.length);
    console.log("tripInput2Records: " + tripInput2Records.length);
    console.log("tripInput3Records: " + tripInput3Records.length);
    console.log("tripInput4Records: " + tripInput4Records.length);
    console.log("tripInput5Records: " + tripInput5Records.length);
    console.log("tripInput6Records: " + tripInput6Records.length);
    console.log("otherRecords: " + otherRecords.length);
    console.log("rows: " + rows.length);
  };

  // //   console.log(tripData2LatLon(r.TripData));
  // //   console.log("Heading: " + tripData2Heading(r.TripData));
  // //   console.log("Speed (MPH): " + tripData2Speed(r.TripData));

  // tripData2Time = function(tripDataString) {
  //   var timeString = tripDataString.substr(tripDataString.length - 8);
  //   var seconds = parseInt(timeString, 16);
  //   var oldDateObject = new Date("2000-03-01T00:00:00Z");
  //   var newDateObject = new Date(oldDateObject.getTime() + seconds/60*60000);
  //   return newDateObject
  // };

  // tripData2LatLon = function(tripDataString) {
  //   // console.log(tripDataString);
  //   var tempLat = ToInt32(tripDataString.substring(0, 6));
  //   var latitude = (tempLat / 60000.0).toFixed(5);
  //   var tempLon = ToInt32(tripDataString.substring(6, 14));
  //   var longitude = (tempLon / 60000.0).toFixed(5);
  //   return [longitude,latitude];
  // };

  // tripData2Heading = function(tripDataString) {
  //   var tempHeading = tripDataString.substring(14, 16);
  //   var heading = tempHeading * 2;
  //   return heading;
  // };

  // tripData2Speed = function(tripDataString) {
  //   var tempSpeed = tripDataString.substring(16, 20);
  //   var speedMPH = tempSpeed * 2.237;
  //   return speedMPH;
  // };

  this.AssetID = asset.AssetID;
  this.AssetName = asset.AssetName;
  this.AssetDesc = asset.AssetDesc;
  this.Fleet = asset.Fleet;
  this.DeviceMacID = asset.DeviceMacID;
  this.DeviceICCID = asset.DeviceICCID;
  // this.TripData = _.filter(asset.TripData, function(trip){return (new Date(trip.RecordDateTime)).getDay().toString() == "1"});
  // console.log(trips);
  this.Trips = trips;
  this.AssetSwitches = asset.AssetSwitches;
  that = this;
  assignTripRecords();
  // var firstTrip = this.TripData[0];
  // if (firstTrip != undefined) {
  //   console.log("------------------------------------------------------------");
  //   console.log(this.AssetName);
  //   console.log("------------------------------------------------------------");
  //   console.log(firstTrip);
  //   console.log(firstTrip.RecordDateTime);
  //   console.log(tripData2Time(firstTrip.TripData));
  //   console.log("Lat,Lon: " + firstTrip.Latitude + "," + firstTrip.Longitude);
  //   console.log("Lat,Lon: " + tripData2LatLon(firstTrip.TripData));
  //   console.log("------------------------------------------------------------");
  // };
  // console.log(this.tripInput1Records.length);
};
