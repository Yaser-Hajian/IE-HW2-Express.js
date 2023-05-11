const controller = require("./../controller");
const { Professor } = require("./../../models/professor");
const Student = require("./../../models/student");
const bcrypt = require("bcrypt");
const {EducationManager} = require("./../../models/education_manager");
const {ItManager} = require("./../../models/it_manager")
module.exports = new (class extends controller {

  async createITManager(req,res){
    let {
      first_name,
      last_name,
      password,
      phone_number,
      email,
      employee_ID,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const new_ITMan = new ItManager({
      first_name,
      last_name,
      password,
      phone_number,
      email,
      employee_ID,
    });
    await new_ITMan.save();
    console.log(new_ITMan);
    res.status(200).json({
      message: "IT Manager was created successfully!",
      data: new_ITMan,
    });
  }

  async createProfessor(req, res) {
    let {
      first_name,
      last_name,
      password,
      phone_number,
      email,
      major,
      faculty,
      professor_ID,
      level,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const new_prof = new Professor({
      first_name,
      last_name,
      password,
      phone_number,
      major,
      email,
      level,
      faculty,
      professor_ID,
    });
    await new_prof.save();
    console.log(new_prof);
    res.status(200).json({
      message: "professor was created successfully!",
      data: new_prof,
    });
  }

  async findAllProfessors(req, res) {
    const professors = await Professor.find().populate().select("-password");
    res.json({ data: professors, message: "successful" });
  }

  async findProfessorById(req, res) {
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

  async deleteProfessorById(req, res) {
    const professor_ID = req.params.id;
    if (isNaN(professor_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const deletedProfessor = await Professor.findOneAndDelete({
      professor_ID,
    });
    if (!deletedProfessor) {
      res.status(404).json("professor not found");
      return;
    }
    if (deletedProfessor.userType != "Professor") {
      res.send("this user is not professor");
    }
    res.status(200).json({
      data: deletedProfessor,
      message: "professor deleted successfully",
    });
  }

  async updateProfessorById(req, res) {
    const professor_ID = req.params.id;
    if (isNaN(professor_ID)) {
      return res.status(400).send("ID must be a number");
    }
    let {
      level,
      faculty,
      major,
      phone_number,
      email,
      password,
      first_name,
      last_name,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const updatedProfessor = await Professor.findOneAndUpdate(
        { professor_ID },
        {
          level,
          faculty,
          major,
          phone_number,
          email,
          password,
          first_name,
          last_name,
        },
        { new: true, select: "-password" }
      );
      if (!updatedProfessor) {
        return res.status(404).send("Professor not found");
      }
      return res.send(updatedProfessor);
    } catch (error) {
      return res.status(500).send("Error updating professor");
    }
  }

  async createStudent(req, res) {
    let {
      first_name,
      last_name,
      password,
      phone_number,
      email,
      student_ID,
      education_level,
      entrance_year,
      entrance_semester,
      major,
      faculty,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const new_student = new Student({
        first_name,
        last_name,
        password,
        phone_number,
        email,
        student_ID,
        education_level,
        entrance_year,
        entrance_semester,
        major,
        faculty,
      });
      await new_student.save();
      console.log(new_student);
      return res.send(new_student);
    } catch (err) {
      console.log(err);
      if (err.code == 11000) {
        return res.status(500).send("duplicate key error");
      }
      return res.status(500).send("we have error");
    }
  }

  async findAllStudents(req, res) {
    const students = await Student.find().populate().select("-password");
    res.json({
      count: students.length,
      data: students,
      message: "successful",
    });
  }

  async findStudentById(req, res) {
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

  async deleteStudentByID(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const deletedStudent = await Student.findOneAndDelete({
      student_ID,
    }).select("-password");
    if (!deletedStudent) {
      res.status(404).json("Student not found");
      return;
    }
    if (deletedStudent.userType != "Student") {
      res.send("this user is not student");
    }
    res.status(200).json({
      data: deletedStudent,
      message: "student deleted successfully",
    });
  }

  async updateStudentByID(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res.status(400).send("ID must be a number");
    }
    let {
      faculty,
      major,
      phone_number,
      email,
      password,
      first_name,
      last_name,
      average_score,
    } = req.body;

    average_score = average_score ? average_score : null;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { student_ID },
        {
          faculty,
          major,
          phone_number,
          email,
          password,
          first_name,
          last_name,
          average_score,
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

  async createManager(req, res) {
    let {
      first_name,
      last_name,
      password,
      phone_number,
      email,
      employee_ID,
      faculty,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const new_manager = new EducationManager({
        first_name,
        last_name,
        password,
        phone_number,
        email,
        employee_ID,
        faculty,
      });
      await new_manager.save();
      console.log(new_manager);
      return res.send(new_manager);
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        return res.status(500).send("duplicate key error");
      }
      return res.status(500).send("we have error");
    }
  }

  async getAllManagers(req,res){
    const managers = await EducationManager.find().populate().select("-password");
    res.json({
        count: managers.length,
        data: managers,
        message: "successful",
      });
  } 

  async findManagerByID(req,res){
    const employee_ID = req.params.id;
    if (isNaN(employee_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const manager = await EducationManager.findOne({ employee_ID }).select("-password");
    if (!manager) {
      res.status(404).json({
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      data: manager,
      message: "successful",
    });
  }

  async deleteManagerById(req,res){
    const employee_ID = req.params.id;
    if (isNaN(employee_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const deletedManager = await EducationManager.findOneAndDelete({
      employee_ID,
    }).select("-password");
    if (!deletedManager) {
      res.status(404).json("manager not found");
      return;
    }
    if (deletedManager.userType != "EducationManager") {
      res.send("this user is not education manager");
    }
    res.status(200).json({
      data: deletedManager,
      message: "education manager deleted successfully",
    });
  }
  
  async updateManagerById(req,res){
    const employee_ID = req.params.id;
    if (isNaN(employee_ID)) {
      return res.status(400).send("ID must be a number");
    }
    let {
      faculty,
      phone_number,
      email,
      password,
      first_name,
      last_name,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    try {
      const updatedManager = await EducationManager.findOneAndUpdate(
        { employee_ID },
        {
          faculty,
          phone_number,
          email,
          password,
          first_name,
          last_name,
        },
        { new: true, select: "-password" }
      );
      if (!updatedManager) {
        return res.status(404).send("Manager not found");
      }
      return res.send(updatedManager);
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send("duplicate value Error");
      }
      return res.status(500).send("Error updating student");
    }
  }
})();
