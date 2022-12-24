const Message = require("../models/messages");
const { validationResult } = require("express-validator");
const Chat = require("../models/chat");
// CREATE new message
exports.createNewMessage = async (req, res, next) => {
  const { chatId, text } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const chat = await Chat.findById(chatId);
    const isMyChat = chat.members.includes(req.userId.toString());
    if (!isMyChat) {
      const error = new Error("This is not your chat");
      error.data = "This is not your chat";
      error.statusCode = 403;
      throw error;
    }
    const message = new Message({ chatId, sender: req.userId, text });
    const newMessage = await message.save();
    res.status(201).json({ message: newMessage });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET chat messages
exports.getChatMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId: chatId });
    res.status(200).json({ messages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
