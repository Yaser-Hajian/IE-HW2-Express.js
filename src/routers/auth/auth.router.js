const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authValidator = require("./auth.validator");

router.post(
  "/login",
  authValidator.loginValidator(),
  authController.validate,
  authController.login.bind(authController)
);


module.exports = router;
