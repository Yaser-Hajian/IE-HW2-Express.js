const mongoose = require("mongoose");
const userSchema = require("./user");
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

const EducationManager = mongoose.model(
  "EducationManager",
  educationManagerSchema
);
module.exports = {
  educationManagerSchema,
  EducationManager,
};
