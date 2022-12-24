const router = require("express").Router();
const User = require("../../models/user");
const chatControler = require("../../controller/chat");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");
router.post(
  "/",
  isAuth,
  [
    body("reciverId")
      .notEmpty()
      .custom(async (value, { req }) => {
        const user = await User.findById(value);
        if (!user) {
          return Promise.reject("This user not found");
        }
      }),
  ],
  chatControler.createNewChat
);

// GET all user chats
router.get("/", isAuth, chatControler.getAllUserChats);

// GET chat with specific user
router.get("/find/:userId", isAuth, chatControler.getChatWithUser);


module.exports = router;
