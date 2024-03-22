const User = require("./model");
const { hashData, verifyHashedData } = require("../../util/hashData");
const createToken = require("../../util/createToken");

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

const authenticateUser = async (data) => {
  try {
    const { email, password } = data;

    const fetchedUser = await User.findOne({ email });

    if (!fetchedUser) {
      throw Error("Invalid email!");
    }

    const hashedPassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);
    if (!passwordMatch) {
      throw Error("Invalid password!");
    }

    const tokenData = { userId: fetchedUser._id, email };
    const token = await createToken(tokenData);
    fetchedUser.token = token;
    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, authenticateUser };
