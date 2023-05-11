const express = require("express");
const router = express.Router();
const adminValidator = require("./admin.validator");
const adminController = require("./admin.controller");
const authGuard = require("../../middleware/auth.guard");
router.post(
  "/Professor",
  authGuard,
  adminValidator.createProfessorValidator(),
  adminController.validate,
  adminController.createProfessor.bind(adminController)
);
router.get(
  "/Professors",
  authGuard,
  adminController.findAllProfessors.bind(adminController)
);

router.get(
  "/Professor/:id",
  authGuard,
  adminController.findProfessorById.bind(adminController)
);

router.delete(
  "/Professor/:id",
  authGuard,
  adminController.deleteProfessorById.bind(adminController)
);
router.put(
  "/Professor/:id",
  authGuard,
  adminValidator.updateProfessorValidator(),
  adminController.validate,
  adminController.updateProfessorById.bind(adminController)
);

router.post(
  "/student",
  authGuard,
  adminValidator.createStudentValidator(),
  adminController.validate,
  adminController.createStudent.bind(adminController)
);

router.get(
  "/students",
  authGuard,
  adminController.findAllStudents.bind(adminController)
);

router.get(
  "/student/:id",
  authGuard,
  adminController.findStudentById.bind(adminController)
);

router.put(
  "/student/:id",
  authGuard,
  adminValidator.updateStudentValidator(),
  adminController.validate,
  adminController.updateStudentByID.bind(adminController)
);

router.delete(
  "/student/:id",
  authGuard,
  adminController.deleteStudentByID.bind(adminController)
);

router.post(
  "/manager",
  authGuard,
  adminValidator.createManagerValidator(),
  adminController.validate,
  adminController.createManager.bind(adminController)
);

router.get(
  "/managers",
  authGuard,
  adminController.getAllManagers.bind(adminController)
);

router.get(
  "/manager/:id",
  authGuard,
  adminController.findManagerByID.bind(adminController)
);

router.delete(
  "/manager/:id",
  authGuard,
  adminController.deleteManagerById.bind(adminController)
);

router.put(
  "/manager/:id",
  authGuard,
  adminValidator.updateManagerValidator(),
  adminController.validate,
  adminController.updateManagerById.bind(adminController)
);

module.exports = router;
