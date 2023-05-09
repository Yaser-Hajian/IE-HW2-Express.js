const mongoose = require("mongoose");
const User = require("./user");
const timestamps = require("mongoose-timestamp");

const educationManagerSchema = mongoose.Schema({
  employee_ID: {
    type: Number,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
});
educationManagerSchema.add(userSchema);
educationManagerSchema.plugin(timestamps);

const EducationManager = User.discriminator(
  "EducationManager",
  educationManagerSchema
);

module.exports = {
  educationManagerSchema,
  EducationManager,
};
