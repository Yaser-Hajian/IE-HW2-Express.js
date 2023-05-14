const express = require("express");
const router = express.Router();
const authRouter = require("./auth/auth.router");
const adminRouter = require("./admin/admin.router");
const authGuard = require("./../middleware/auth.guard");
const roleGuard = require("./../middleware/role.guard");
const educationManagerRouter = require("./education-manager/educationManager.router");
const checkRole = require("../middleware/checkRole");
const educationManagerController = require("./../routers/education-manager/educationManager.controller");
const studentController = require("./student/student.controller");
const studentRouter = require("./../routers/student/student.router")
const professorRouter = require("./../routers/professor/professor.router")

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
    return studentRouter(req,res,next)
  }
  if (req.isProfessor) {
    return professorRouter(reg,res,next)
  }
  return res.status(401).json({ error: 'Unauthorized' });
});
router.use("/course", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  if (req.isStudent) {
    return studentRouter(req,res,next)
  }
  if (req.isProfessor) {
    return professorRouter(reg,res,next)
  }
  return res.status(401).json({ error: 'Unauthorized' });
});
router.get("/students" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getStudents(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.get("/student/:id" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getStudentById(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.get("/Professors" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getProfessors(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.get("/Professor/:id" , authGuard, checkRole ,(req,res) => {
  if (req.isEducationManager) {
    return educationManagerController.getProfessorById(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

router.put("/student/:id" , authGuard, checkRole ,(req,res) => {
  if (req.isStudent) {
    return studentController.updateStudentById(req,res);
  }
  return res.status(401).json({ error: 'Unauthorized' });
})

module.exports = router;
