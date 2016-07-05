var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  day: String,
  timeStamp: String,
  inOrOut: String
})

module.exports = mongoose.model("Time", timeSchema);
