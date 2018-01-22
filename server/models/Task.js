'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema(
{
  name: { type: String, required: true },
  type: { type: Number, required: true },
  hours: { type: Number, required: true }
});
module.exports = mongoose.model('Task', TaskSchema);
