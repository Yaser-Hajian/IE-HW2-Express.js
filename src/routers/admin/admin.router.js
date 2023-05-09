const express = require("express");
const router = express.Router();
const adminValidator = require("./admin.validator");
const adminController = require("./admin.controller");
router.post(
  "/Professor",
  adminValidator.createProfessorValidator(),
  adminController.validate,
  adminController.createProfessor.bind(adminController)
);
router.get(
  "/Professors",
  adminController.findAllProfessors.bind(adminController)
);

router.get(
  "/Professor/:id",
  adminController.findProfessorById.bind(adminController)
);

router.delete(
  "/Professor/:id",
  adminController.deleteProfessorById.bind(adminController)
);
router.put(
  "/Professor/:id",
  adminValidator.updateProfessorValidator(),
  adminController.validate,
  adminController.updateProfessorById.bind(adminController)
);

module.exports = router;
