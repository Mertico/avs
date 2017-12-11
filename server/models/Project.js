'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  module.exports = mongoose.model('ProjectTags', ProjectTagsSchema);
var ProjectRoleSchema = new Schema(
{
  name: { type: String, required: true },
  people: { type: Number, required: true },
  time: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true }
}
);
  module.exports = mongoose.model('ProjectRole', ProjectRoleSchema);
var ProjectContactsSchema = new Schema(
{
  customer: {
    name: { type: String, required: true },
    official_name: { type: String, required: true },
    mail: { type: String, required: true },
    phone: { type: String, required: true }
  },
  performer: {
    name: { type: String, required: true },
    official_name: { type: String, required: true },
    mail: { type: String, required: true },
    phone: { type: String, required: true }
  }
});
  module.exports = mongoose.model('ProjectContacts', ProjectContactsSchema);
var ProjectSchema = new Schema(
{
  name: { type: String, required: true },
  id_user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  stage: [{ type: Schema.Types.ObjectId, ref: 'stage', required: true }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'tags', required: true }],
  role: [ProjectRoleSchema],
  contacts: [ProjectContactsSchema]
}
);
module.exports = mongoose.model('Project', ProjectSchema);
