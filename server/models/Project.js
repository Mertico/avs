'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectTasksSchema = new Schema(
{
  id: { type: Schema.Types.ObjectId, ref: 'tasks', required: true },
  value: { type: Number, required: true }
});
module.exports = mongoose.model('ProjectTasks', ProjectTasksSchema);

var ProjectContactsSchema = new Schema(
{
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  lastName: { type: String, required: true },
  mail: { type: String, required: true },
  phone: { type: String, required: true }
});
module.exports = mongoose.model('ProjectContacts', ProjectContactsSchema);

var ProjectSchema = new Schema(
{
  name: { type: String, required: true },
  contacts: ProjectContactsSchema,
  tasks: [ProjectTasksSchema],
  discount: { type: Number, required: true }
});
module.exports = mongoose.model('Project', ProjectSchema);
