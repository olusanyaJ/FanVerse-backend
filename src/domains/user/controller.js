const User = require("./model");
const { hashData } = require("../../util/hashData");

const createNewUser = async (data) => {
  try {
    const { username, email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }

    const hashedPassword = await hashData(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { createNewUser };
