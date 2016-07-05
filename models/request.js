var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  date: String,
  requestType: String,
  timeIn: String,
  timeOut: String,
  description: String,
  status: {type: String, default: "Pending"},
  user: {type: String, ref: "User"}
})

module.exports = mongoose.model("Request", requestSchema);
