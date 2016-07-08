var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  date: String,
  latitude: String,
  longitude: String

})

module.exports = mongoose.model("Location", locationSchema);
