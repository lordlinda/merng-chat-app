const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validator");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = {
  register: async ({
    registerInput: { email, password, username, confirmPassword },
  }) => {
    try {
      /**
       * First we validate the user credentials
       */
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      console.log(valid, errors);
      /**throw an error if the credentials are invalid */
      if (Object.keys(errors).length > 1) {
        throw new Error("Invalid credentials ");
      }
      /**check if we already have the same user in our database **/
      const alreadyUser = await User.findOne({ username });
      console.log(alreadyUser);
      if (alreadyUser) {
        throw new Error("this username is taken");
      }
      /**otherwise we hash the password and save the user to the database */
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();
      /**we return atoken and user credentials */
      const token = generateToken(user);
      return {
        ...user._doc,
        _id: user.id,
        token,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  login: async ({ username, password }) => {
    const { errors, valid } = validateLoginInput(username, password);
    if (Object.keys(errors).length > 1) {
      throw new Error("Wrong credentials");
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("wrong credentials");
    }
    const token = generateToken(user);
    return {
      ...user._doc,
      _id: user.id,
      token,
    };
  },
};
