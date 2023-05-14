const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {

  createOfficialCourseValidator() {
    return [
      check("course_ID")
        .exists()
        .not()
        .isEmpty()
        .withMessage("course ID in mandatory"),
      check("course_name")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("course name in mandatory"),  
      check("major")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("major in mandatory"),  
      check("credit")
        .exists()
        .isNumeric()
        .not()
        .isEmpty()
        .withMessage("credit in mandatory"),  
      check("courseType")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("course type in mandatory"),  
    ];
  }

  
}
)();
