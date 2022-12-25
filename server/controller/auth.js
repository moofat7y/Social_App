const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
// Post signup
exports.putSignup = async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.data = errors.array()[0];
      error.statusCode = 422;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    sendEmail(
      email,
      "Welcome to my app",
      `<div style="max-width: 700px;margin:auto;border: 10px solid rgb(107,76,230);padding:50px 20px">
      <h2 style="text-align:center;text-transform:uppercase;color: rgb(107,76,230)">SOCIAL_APP</h2>
      <p>Successfuly signup</p>
      </div>`
    );
    await newUser.save();
    return res.status(201).json({ message: "Signed up successfuly" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// POST signin
exports.postSignin = async (req, res, next) => {
  const email = req.body.email;
  const userpassword = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("You are not signed up");
      error.statusCode = 403;
      error.data = "You are not signed up";
      throw error;
    }
    const passMatched = await bcrypt.compare(userpassword, user.password);
    if (!passMatched) {
      const error = new Error("Invalid password");
      error.data = "Invalid password";
      error.statusCode = 403;
      throw error;
    }
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "30d" }
    );

    const { password, ...other } = user._doc;
    res.status(200).json({
      message: "Successfuly Signin",
      token,
      userData: { ...other },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// FORGOT password
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("This email does not exist");
      error.data = "This email does not exist";
      error.statusCode = 404;
      throw error;
    }
    const access_token = createAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });
    const URL = `${process.env.CLIENT_URL}/user/reset/${access_token}/`;
    sendEmail(
      email,
      "Reset your password",
      `<div style="max-width: 700px;margin:auto;border: 10px solid rgb(107,76,230);padding:50px 20px">
      <h2 style="text-align:center;text-transform:uppercase;color: rgb(107,76,230)">SOCIAL_APP</h2>
      <p>Just click the button below to return your account</p>
      <a href=${URL} style="background: rgb(107,76,230);text-decoration:none;color:white;padding:10px 20px;">Reset</a>
      <p>if button doesn't work for any reason, you cas also click on the link below:</p>
      <div>${URL}</div>
      </div>`
    );

    res
      .status(200)
      .json({ message: "Re-send the password, please check your email." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// RESET password
exports.resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty) {
      const error = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });
    res.status(200).json({ message: "Password changed" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "15m" });
};
