const express = require("express");
const professorController = require("./professor.controller")
const router = express.Router();



router.get("",professorController.getCourses.bind(professorController))
router.get("/:id",professorController.getCourseById.bind(professorController))
module.exports = router;
