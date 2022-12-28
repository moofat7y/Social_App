const router = require("express").Router();
const userControll = require("../../controller/user");
const User = require("../../models/user");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");
// UPDATE user
router.patch(
  "/:userId",
  isAuth,
  [
    body(
      "username",
      "Invalid username. Allowed characters are a-z, A-Z, 0-9, (_,-,.)."
    )
      .matches(/^(?!(?:[^.]*\.){2})[A-Za-z][A-Za-z0-9.]{3,19}$/)
      .custom(async (value, { req }) => {
        const user = await User.findOne({ username: value });
        if (user) {
          if (user?._id.toString() !== req.userId) {
            return Promise.reject("This username already exist");
          }
        }
      }),
  ],

  userControll.putUser
);
// UPDATE user profilePicture
router.patch("/update/profileImage", isAuth, userControll.updateProfilePicture);
// UPDATE user coverPicture
router.patch("/update/coverImage", isAuth, userControll.updateCoverImage);
// DELETE user
router.delete("/delete", isAuth, userControll.deleteUser);
// GET user
router.get("/:userId", isAuth, userControll.getUser);
// GET users by username
router.get("/search/:userName", isAuth, userControll.getByUsername);
// FOLLOW user
router.patch("/follow/:userId", isAuth, userControll.followUser);
// UNFOLLOW user
router.patch("/unfollow/:userId", isAuth, userControll.unfollowUser);
// GET suggistions
router.get("/users/suggistion", isAuth, userControll.getUserSuggetions);
module.exports = router;
