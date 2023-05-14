const  SemesterCourse = require("../../models/semester_course");
const Student = require("../../models/student");
const controller = require("./../controller");
const bcrypt = require("bcrypt");
const OfficialCourse = require("./../../models/official_course");

module.exports = new (class extends controller {
  async updateStudentById(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res.status(400).send("ID must be a number");
    }
    if (req.user.student_ID != student_ID) {
      return res.status(403).send("this ID is not your ID");
    }

    let { phone_number, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { student_ID },
        {
          phone_number,
          email,
          password,
        },
        { new: true, select: "-password" }
      );
      if (!updatedStudent) {
        return res.status(404).send("Student not found");
      }
      return res.send(updatedStudent);
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send("duplicate value Error");
      }
      return res.status(500).send("Error updating student");
    }
  }

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
