const mongoose = require("mongoose");
const officialCourseSchema = require("./official_course");
const timestamps = require("mongoose-timestamp");
const { Professor } = require("./professor");

const semesterCourseSchema = mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  course_prerequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterCourse",
      default: []
    },
  ],
  course_requirements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterCourse",
      default: []
    },
  ],
  credit: {
    type: Number,
    required: true,
  },
  class_times: {
    type: Array,
    items: {
      type: String,
    },
  },
  class_dates: {
    type: Array,
    items: {
      type: String,
    },
  },
  exam_time: {
    type: String,
    required: true,
  },
  exam_date: {
    type: Date,
    required: true,
  },
  exam_place: {
    type: String,
    required: true,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
  },
  capacity: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

semesterCourseSchema.plugin(timestamps);
const SemesterCourse = mongoose.model("SemesterCourse", semesterCourseSchema);
module.exports = {
  semesterCourseSchema,
  SemesterCourse,
};
