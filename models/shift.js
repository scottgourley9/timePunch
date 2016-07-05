var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shiftSchema = new Schema({
  day: String,
  start: String,
  end: String,
  lunch: String,
  user: {type: String, ref: "User"}
})

module.exports = mongoose.model("Shift", shiftSchema);
