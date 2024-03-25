const express = require("express");
const router = express.Router();

const {
  sendPasswordResetOTPEmail,
  resetUserPassword,
} = require("./controller");

router.post("/reset", async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) {
      throw Error("Empty values, credentials are required.");
    }

    await resetUserPassword({ email, otp, newPassword });
    res.status(200).json({ email, passwordreset: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("An email is required.");
    }

    const createdPasswordOTPReset = await sendPasswordResetOTPEmail(email);
    res.status(200).json(createdPasswordOTPReset);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
