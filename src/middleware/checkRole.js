const checkRole = async (req, res, next) => {
  if (req.user.userType === "EducationManager") {
    req.isEducationManager = true;
  } else if (req.user.userType === "Student") {
    req.isStudent = true;
  } else if (req.user.userType === "ItManager") {
    req.isITManager = true;
  } else if (req.user.userType === "Professor") {
    req.isProfessor = true;
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}
module.exports = checkRole
