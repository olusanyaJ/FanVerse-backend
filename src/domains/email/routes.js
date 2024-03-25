const express = require("express");
const router = express.Router();

const { sendVerificationOTPEmail, verifyUserEmail } = require("./controller");

/**
 * POST /fanverse/api/email/verify
 * - verifies email with otp generated
 * - Expected body: { email, otp }
 */
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!(email && otp)) {
      throw Error("Provide valid otp details");
    }

    await verifyUserEmail({ email, otp });
    res.status(200).json({ email, verified: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * POST /fanverse/api/email
 * - verifies otp created
 * - Expected body: { email, otp }
 */
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("Email required!");
    }

    const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);
    res.status(200).json(createdEmailVerificationOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
