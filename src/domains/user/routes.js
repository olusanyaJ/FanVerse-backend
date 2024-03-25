const express = require("express");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");
const auth = require("../../middleware/auth");
const { sendVerificationOTPEmail } = require("../email/controller");

/**
 *  GET /profile
 * -   Gets information about the currently logged in user.
 * -   Expected headers: auth middleware
 */
router.get("/profile", auth, (req, res) => {
  res.status(200).send(req.currentUser);
});

/**
 * GET /user/:id
 * - Retrieves a specific user from the users table
 */
router.get("/:id", async (req, res) => {
  try {
    const { _id } = req.body;

    const fetchedUser = await User.findOne({ _id });
    if (!fetchedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(fetchedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * POST /fanverse/api/user/signup
 * - creates a new user on signup
 * - Expected body: { username, email, password }
 */
router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!(username && email && password)) {
      throw Error("Empty input fields");
    } else if (!emailRegex.test(email)) {
      throw Error("Enter a valid Email");
    } else if (password.length < 8) {
      throw Error("Password is too short!");
    } else {
      const newUser = await createNewUser({
        username,
        email,
        password,
      });
      await sendVerificationOTPEmail(email);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * POST /fanverse/api/user/login
 * - creates user login
 * - Expected body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!(email && password)) {
      throw Error("Empty credentials");
    }

    const authenticatedUser = await authenticateUser({
      email,
      password,
    });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
