const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const OTPRoutes = require("../domains/otp");
const emailRoutes = require("../domains/email");

router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email", emailRoutes);

module.exports = router;
