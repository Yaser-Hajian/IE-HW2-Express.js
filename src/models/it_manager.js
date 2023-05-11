const mongoose = require('mongoose');
const User = require('./user')
const timestamps = require('mongoose-timestamp');

const ItManagerSchema = mongoose.Schema({
  employee_ID: {
    type: Number,
    required: true,
  }
});
ItManagerSchema.plugin(timestamps);
const ItManager = User.discriminator("ItManager", ItManagerSchema)

module.exports = {
  ItManagerSchema,
  ItManager
}
