var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String, require: true},
  companyId: {type: String, require: true},
  timeStamps: [{type: String, ref: "Time"}],
  schedule: [{type: String, ref: "Shift"}],
  requests: [{type: String, ref: "Request"}],
  locations: [{type: String, ref: "Location"}]
})

module.exports = mongoose.model("User", userSchema);
