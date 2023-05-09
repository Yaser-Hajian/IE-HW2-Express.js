const { validationResult } = require("express-validator");

module.exports = class {
  constructor() {
    this.validate = this.validate.bind(this);
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((err) => messages.push(err.msg));
      res.status(400).json({
        data: messages,
        message: "validation error",
      });
      return false;
    }
    return true;
  }
  //middleware for validation
  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
};
