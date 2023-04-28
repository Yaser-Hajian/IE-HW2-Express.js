const mongoose = require('mongoose');
const userSchema = require('./user')
const timestamps = require('mongoose-timestamp');

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
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  faculty:{
    type: String,
    required: true,
  }
});
studentSchema.add(userSchema);
studentSchema.plugin(timestamps);
const Student = mongoose.model("Student", studentSchema);
module.exports = {
  studentSchema,
  Student
}
