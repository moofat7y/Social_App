const { Router } = require("express");
const { body } = require("express-validator");
const User = require("../../models/user");
const userControll = require("../../controller/auth");
const router = Router();
const isAuth = require("../middlewares/isAuth");
// POST Signup
router.put(
  "/signup",
  [
    body(
      "username",
      "Invalid username. Allowed characters are a-z, A-Z, 0-9, (_,-,.)."
    )
      .matches(/^(?!(?:[^.]*\.){2})[A-Za-z][A-Za-z0-9.]{3,19}$/)
      .custom(async (value, { req }) => {
        const user = await User.findOne({ username: value });
        if (user) {
          return Promise.reject("this username already exsist");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email already used");
        }
      }),
    body(
      "password",
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 6 , max 20 char long"
    )
      .trim()
      .isLength({ min: 6 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  ],
  userControll.putSignup
);
// SIGN in
router.post("/signin", userControll.postSignin);
// FORGOT user password
router.post(
  "/forgotpassword",
  [body("email").notEmpty().isEmail().withMessage("Invalid email")],
  userControll.forgotPassword
);

// RESET user password
router.post(
  "/resetpassword",
  [body("password").isLength({ min: 6 })],
  isAuth,
  userControll.resetPassword
);
module.exports = router;
