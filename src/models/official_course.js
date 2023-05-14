const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const officialCourseSchema = mongoose.Schema(
  {
    course_id:{
      type: Number,
      required: true,
      unique:true
    },
    course_name: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    course_prerequisites: [
      {
        type: String,
        default: []
      },
    ],
    course_requirements: [
      {
        type: String,
        default: []
      },
    ],
    credit: {
      type: Number,
      required: true,
    },
  }
);

officialCourseSchema.plugin(timestamps);
const OfficialCourse = mongoose.model("OfficialCourse", officialCourseSchema);

module.exports = {
  officialCourseSchema,
  OfficialCourse,
};
