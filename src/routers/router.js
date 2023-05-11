const express = require("express");
const router = express.Router();
const authRouter = require("./auth/auth.router");
const adminRouter = require("./admin/admin.router");
const authGuard = require("./../middleware/auth.guard")
const rollGuard = require("./../middleware/roll.guard")


router.use("/auth", authRouter);
router.use("/admin", authGuard, rollGuard("ItManager"), adminRouter);

module.exports = router;
