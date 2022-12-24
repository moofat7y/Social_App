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
    body("username")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Invalid username")
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
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }).isAlphanumeric(),
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
