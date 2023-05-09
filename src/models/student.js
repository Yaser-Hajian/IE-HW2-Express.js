const User = require("./user");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const studentSchema = mongoose.Schema({
  education_level: {
    type: String,
    enum: ["Bachelor", "Master", "PhD"],
    required: true,
  },
  student_ID: {
    type: Number,
    required: true,
  },
  entrance_year: {
    type: Number,
    required: true,
  },
  entrance_semester: {
    type: Number,
    required: true,
  },
  average_score: {
    type: Number,
    // required: true,
  },
  major: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
});

studentSchema.plugin(timestamps);
const Student = User.discriminator("Student", studentSchema)

module.exports = Student;
