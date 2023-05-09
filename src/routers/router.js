const express = require('express');
const router = express.Router();
const authRouter = require("./auth/auth.router")
const adminRouter = require("./admin/admin.router")

router.use('/auth' , authRouter);
router.use('/admin' , adminRouter)

module.exports = router;