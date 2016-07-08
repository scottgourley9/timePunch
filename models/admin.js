var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  name: {type: String, require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String, require: true},
  companyId: {type: String, unique: true, require: true},
  setLocationLat: String,
  setLocationLng: String,
  noLocation: Boolean
})

module.exports = mongoose.model("Admin", adminSchema);
