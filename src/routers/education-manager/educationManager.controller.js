const { OfficialCourse } = require("../../models/official_course");
const { SemesterCourse } = require("../../models/semester_course");
const Student = require("../../models/student");
const controller = require("./../controller");
const bcrypt = require("bcrypt");
const {Professor} = require("./../../models/professor");

module.exports = new (class extends controller {
  //TODO: need validator
  async createCourse(req, res) {
    const { courseType } = req.body;
    if (courseType == "official") {
      const {
        course_name,
        course_id,
        major,
        credit,
        course_prerequisites,
        course_requirements,
      } = req.body;
      try {
        const newOfficialCourse = new OfficialCourse({
          course_name,
          course_id,
          major,
          credit,
          course_prerequisites,
          course_requirements,
        });
        await newOfficialCourse.save();
        console.log(newOfficialCourse);
        return res.json({
          data: newOfficialCourse,
          message: "successful",
        });
      } catch (error) {
        if (error.code == 11000) {
          return res.status(500).send("duplicate key error");
        }
        return res.status(500).send("we have error");
      }
    }
    const {
      course_name,
      course_id,
      major,
      credit,
      course_prerequisites,
      course_requirements,
      class_times,
      class_dates,
      exam_time,
      exam_date,
      exam_place,
      professor,
      capacity,
      semester,
    } = req.body;

    try {
      const newSemesterCourse = new SemesterCourse({
        course_name,
        course_id,
        major,
        credit,
        course_prerequisites,
        course_requirements,
        class_times,
        class_dates,
        exam_time,
        exam_date,
        exam_place,
        professor,
        capacity,
        semester,
      });
      await newSemesterCourse.save();
      console.log(newSemesterCourse);
      res.json({
        message: "successful",
        data: newSemesterCourse,
      });
    } catch (error) {
      return res.status(500).send("duplicate key error");
    }
    return res.status(500).send("we have error");
  }

  async getCourses(req, res) {
    try {
      const officialCourses = await OfficialCourse.find();
      const semesterCourses = await SemesterCourse.find();
      res.json({
        officialCourses: {
          count: officialCourses.length,
          data: officialCourses,
        },
        semesterCourses: {
          count: semesterCourses.length,
          data: semesterCourses,
        },
        message: "successful",
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async getCourseById(req, res) {
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

  async deleteCourseById(req, res) {
    const type = req.query.type;
    const course_id = req.params.id;
    if (!type) {
      res.status(400).send("you should set type of course");
    }

    if (isNaN(course_id)) {
      return res.status(400).send("ID must be a number");
    }
    if (type == "official") {
      const course = await OfficialCourse.findOneAndDelete({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully delete",
        data: course,
      });
    } else if (type == "semester") {
      const course = await SemesterCourse.findOneAndDelete({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully deleted",
        data: course,
      });
    }
  }

  //TODO: validator needed
  async updateCourseById(req, res) {
    const type = req.query.type;
    const course_id = req.params.id;
    if (!type) {
      res.status(400).send("you should set type of course");
    }

    if (isNaN(course_id)) {
      return res.status(400).send("ID must be a number");
    }
    if (type == "official") {
      const {
        course_name,
        major,
        credit,
        course_prerequisites,
        course_requirements,
      } = req.body;
      const course = await OfficialCourse.findOneAndUpdate(
        { course_id },
        {
          course_name,
          major,
          credit,
          course_prerequisites,
          course_requirements,
        },
        {
          new: true,
        }
      );
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully updated",
        data: course,
      });
    } else if (type == "semester") {
      const {
        course_name,
        major,
        credit,
        course_prerequisites,
        course_requirements,
        class_times,
        class_dates,
        exam_time,
        exam_date,
        exam_place,
        professor,
        capacity,
        semester,
      } = req.body;
      const course = await SemesterCourse.findOneAndUpdate(
        { course_id },
        {
          course_name,
          major,
          credit,
          course_prerequisites,
          course_requirements,
          class_times,
          class_dates,
          exam_time,
          exam_date,
          exam_place,
          professor,
          capacity,
          semester,
        },
        {
          new: true,
        }
      );
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully updated",
        data: course,
      });
    }
  }

  async getStudents(req, res) {
    try {
      const students = await Student.find().populate().select("-password");
      res.json({
        count: students.length,
        data: students,
        message: "successful",
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async getStudentById(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const student = await Student.findOne({ student_ID }).select("-password");
    if (!student) {
      res.status(404).json({
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      data: student,
      message: "successful",
    });
  }

  async getProfessors(req, res) {
    try {
      const professors = await Professor.find().populate().select("-password");
      res.json({ count : professors.length ,  data: professors, message: "successful" });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async getProfessorById(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).send("ID must be a number");
    }
    const professor = await Professor.findOne({ professor_ID: id }).select(
      "-password"
    );
    if (!professor) {
      res.status(404).json({
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      data: professor,
      message: "successful",
    });
  }
})();
