var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// preciseinfox response from AssetList
// { AssetSwitchID: 8155,
//   AssetID: 10995,
//   Description: 'Plow',
//   SwitchNumber: 1,
//   OffLabel: 'UP',
//   OnLabel: 'DOWN',
//   IsAvailability: false }

// var AssetSwitchSchema = new Schema({
//   AssetSwitchID: Number,
//   AssetID: Number,
//   Description: String,
//   SwitchNumber: Number,
//   OffLabel: String,
//   OnLabel: String,
//   IsAvailability: Boolean
// });

// preciseinfox response from AssetList
// { AssetID: 10993,
//   AssetName: '3213 2TON',
//   AssetDesc: '2 TON',
//   Fleet: 'Louisville',
//   DeviceMacID: '',
//   DeviceICCID: '89011704252318989719',
//   LastMod: '2016-09-30T14:36:34.95' }

var FleetSchema   = new Schema({
  AssetID: { type: Number, index: true },
  AssetName: String,
  AssetDesc: String,
  Fleet: String,
  DeviceMacID: String,
  DeviceICCID: String,
  LastMod: Date,
  Switches: Array,
  SyncedDates: Array
});

// FleetSchema.virtual('Trips', {
//   ref: 'TripData', // The model to use
//   localField: '_id', // Find model where `localField` FleetSchema
//   foreignField: 'Asset_id' // is equal to `foreignField`
// });

module.exports = mongoose.model('Fleet', FleetSchema);
// module.exports = mongoose.model('AssetSwitch', AssetSwitchSchema);
