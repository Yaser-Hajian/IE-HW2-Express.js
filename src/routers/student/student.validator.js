const express = require("express");
const studentController = require("./student.controller");
const router = express.Router();

router.get("", studentController.getCourses.bind(studentController));

module.exports = router;
