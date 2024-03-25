const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const OTPRoutes = require("../domains/otp");
const emailRoutes = require("../domains/email");
const passwordRoutes = require("../domains/password");

router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email", emailRoutes);
router.use("/password", passwordRoutes);

module.exports = router;
