const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const officialCourseSchema = mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  course_prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OfficialCourse',
    default: []
  }],
  course_requirements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OfficialCourse',
    default: []
  }],
  credit: {
    type: Number,
    required: true
  }
});

officialCourseSchema.plugin(timestamps);
const OfficialCourse = mongoose.model("OfficialCourse", officialCourseSchema);

module.exports = {
  officialCourseSchema,
  OfficialCourse,
};
