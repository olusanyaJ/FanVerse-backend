const express = require("express");
const router = express.Router();
const { createNewUser } = require("./controller");

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
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
