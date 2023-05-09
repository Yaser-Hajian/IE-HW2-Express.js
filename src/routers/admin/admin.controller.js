const controller = require("./../controller");
const { Professor } = require("./../../models/professor");
const User = require("./../../models/user");
module.exports = new (class extends controller {
  async createProfessor(req, res) {
    const {
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
    });
  }

  async findAllProfessors(req, res) {
    const professors = await Professor.find()
      .populate()
      .select("first_name last_name professor_ID major faculty level");
    res.json({ data: professors, message: "done" });
  }

  async findProfessorById(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).send("ID must be a number");
    }
    const professor = await Professor.findOne({ professor_ID: id }).select(
      "first_name last_name professor_ID major faculty email level"
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
      res.status(404).json("user not found");
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
    const {
      level,
      faculty,
      major,
      phone_number,
      email,
      password,
      first_name,
      last_name,
    } = req.body;
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
})();
