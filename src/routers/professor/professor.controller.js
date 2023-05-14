const controller = require("./../controller");
const bcrypt = require("bcrypt");
const OfficialCourse = require("./../../models/official_course");
const SemesterCourse = require("./../../models/semester_course");

module.exports = new (class extends controller {
  
  async getCourses(req, res) {
    const major = req.query.major;

    if (!major) {
      res.status(400).send("you should set major");
    }
    try{
      const courses = await SemesterCourse.find({major});
      res.json({
        count: courses.length,
        data: courses,
        message : "successful"
      })
    }catch(error){
      res.status(500).send("Error")
    }
    

  }

  async getCourseById(req,res){
    const type = req.query.type;
    const course_id = req.params.id;
    if (!type) {
      res.status(400).send("you should set type of course");
    }

    if (isNaN(course_id)) {
      return res.status(400).send("ID must be a number");
    }
    if (type == "official") {
      const course = await OfficialCourse.findOne({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successful",
        data: course,
      });
    } else if (type == "semester") {
      const course = await SemesterCourse.findOne({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successful",
        data: course,
      });
    }
  }
})();
