const express = require("express");
const router = express.Router();
const authRouter = require("./auth/auth.router");
const adminRouter = require("./admin/admin.router");
const authGuard = require("./../middleware/auth.guard");
const roleGuard = require("./../middleware/role.guard");
const educationManagerRouter = require("./education-manager/educationManager.router");
const checkRole = require("../middleware/checkRole");
const educationManagerController = require("./../routers/education-manager/educationManager.controller")


router.use("/auth", authRouter);
router.use("/admin", authGuard, roleGuard("ItManager"), adminRouter);
router.use("/course", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  if (req.isStudent) {
  }
  return res.status(401).json({ error: 'Unauthorized' });
});
router.use("/courses", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  if (req.isStudent) {
  }
  return res.status(401).json({ error: 'Unauthorized' });
});
router.use("/course", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  return res.status(401).json({ error: 'Unauthorized' });
});
router.use("/students" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getStudents(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.use("/student/:id" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getStudentById(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.use("/Professors" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getProfessors(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.use("/Professor/:id" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getProfessorById(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

module.exports = router;
