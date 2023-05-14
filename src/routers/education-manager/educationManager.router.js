const express = require("express");
const educationManagerController = require("./educationManager.controller");
const educationManagerValidator = require("./educationManager.validator")
const router = express.Router();



router.post("",educationManagerController.createCourse.bind(educationManagerController))
router.get("",educationManagerController.getCourses.bind(educationManagerController))
router.get("/:id",educationManagerController.getCourseById.bind(educationManagerController))
router.delete("/:id",educationManagerController.deleteCourseById.bind(educationManagerController))
router.put("/:id",educationManagerController.updateCourseById.bind(educationManagerController))
module.exports = router;
