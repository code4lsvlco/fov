var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SegmentDataSchema = new Schema({
  AssetID: String,
  segment_id: String,
  partial: Boolean,
  startDateTime: Date,
  endDateTime: Date,
  duration: Number,
  length: Number,
  feature_collections: Object
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

SegmentDataSchema
  .virtual('duration_to_string')
  .get(function () {
    // var duration = moment(this.duration);
    // var hours = duration.asHours();
    var strTime = ""
    // if (hours < 1) {
    //   var minutes = Math.round(hours * 60);
    //   if (minutes == 60) {
    //     strTime = "1 hour";
    //   } else {
    //     strTime = Math.round(hours * 60) + " minutes";
    //   };
    //
    // } else {
    //   var minutes = hours % 1;
    //   minutes = Math.round(minutes * 60);
    //   hours = Math.floor(hours);
    //   if (hours == 1) {
    //     strTime = hours + " hour " + minutes + " minutes";
    //   } else {
    //     strTime = hours + " hours " + minutes + " minutes";
    //   };
    // };
    var minutes = this.duration;
    // minutes = Math.round(minutes * 60);
    hours = Math.floor(minutes/60);
    minutes = minutes - (hours * 60);
    minutes = Math.ceil(minutes);
    if (hours == 0) {
      strTime = minutes + " minutes";
    } else {
      if (hours == 1) {
        strTime = hours + " hour " + minutes + " minutes";
      } else {
        strTime = hours + " hours " + minutes + " minutes";
      };
    };
    return strTime;
  });

module.exports = mongoose.model('SegmentData', SegmentDataSchema);
