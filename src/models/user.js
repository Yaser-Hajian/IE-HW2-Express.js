const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    length: 11,
  },
});
userSchema.plugin(timestamps);
const User = mongoose.model("User", userSchema);
module.exports = {
  userSchema,
  User,
};
