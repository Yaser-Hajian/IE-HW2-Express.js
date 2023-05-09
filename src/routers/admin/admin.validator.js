const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  createProfessorValidator() {
    return [
      check("professor_ID")
        .exists()
        .not()
        .isEmpty()
        .withMessage("professor ID in mandatory"),
      check("major").exists().isString().not().isEmpty().withMessage("major in mandatory"),
      check("faculty")
        .isString()
        .exists()
        .not()
        .isEmpty()
        .withMessage("faculty in mandatory"),
      check("level").exists().isString().not().isEmpty().withMessage("level in mandatory"),
      check("password")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("password cant be empty"),
      check("first_name")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("first name cant be empty"),
      check("last_name")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("last name cant be empty"),
      check("phone_number")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("phone number cant be empty"),
      check("email")
        .exists()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage("first name cant be empty"),
    ];
  }

  updateProfessorValidator() {
    return [
      check("major")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("major in mandatory"),
      check("faculty")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("faculty in mandatory"),
      check("level").exists().isString().not().isEmpty().withMessage("level in mandatory"),
      check("password")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("password cant be empty"),
      check("first_name")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("first name cant be empty"),
      check("last_name")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("last name cant be empty"),
      check("phone_number")
        .exists()
        .isString()
        .not()
        .isEmpty()
        .withMessage("phone number cant be empty"),
      check("email")
        .exists()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage("first name cant be empty"),
    ];
  }
}
)();
