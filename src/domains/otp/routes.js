const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("./controller");

/**
 * POST /fanverse/api/otp/verify
 * - verifies otp created
 * - Expected body: { email, otp }
 */
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const verifiedOTP = await verifyOTP({ email, otp });
    res.status(200).json({ valid: verifiedOTP });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * POST /fanverse/api/otp/
 * - creates otp
 * - Expected body: { email, subject, message, duration }
 */
router.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
