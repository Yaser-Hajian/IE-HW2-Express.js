const mongoose = require('mongoose');
const userSchema = require('./user')
const timestamps = require('mongoose-timestamp');

const ItManagerSchema = mongoose.Schema({
  employee_ID: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});
ItManagerSchema.add(userSchema);
ItManagerSchema.plugin(timestamps);
const ItManager = mongoose.model("ItManager", ItManagerSchema);
module.exports = {
  ItManagerSchema,
  ItManager
}
