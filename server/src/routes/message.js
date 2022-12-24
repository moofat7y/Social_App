const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");
const router = require("express").Router();
const Chat = require("../../models/chat");
const messageControler = require("../../controller/message");
// POST new message
router.post(
  "/",
  isAuth,
  [
    body("chatId")
      .notEmpty()
      .custom(async (value, { req }) => {
        const chat = await Chat.findById(value);
        if (!chat) {
          return Promise.reject("This chat not found");
        }
      }),
  ],
  messageControler.createNewMessage
);

// GET chat messages
router.get("/:chatId", isAuth, messageControler.getChatMessages);
module.exports = router;
