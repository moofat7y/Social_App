const Chat = require("../models/chat");
const User = require("../models/user");
const { validationResult } = require("express-validator");

// CREATE new chat with user
exports.createNewChat = async (req, res, next) => {
  const reciverId = req.body.reciverId;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const exsitsChat = await Chat.find({
      members: { $all: [req.userId, reciverId] },
    });
    if (exsitsChat.length > 0) {
      const error = new Error("chat is exsist before");
      error.statusCode = 422;
      throw error;
    } else {
      const newChat = new Chat({ members: [req.userId, reciverId] });
      const result = await newChat.save();
      res.status(201).json({ result });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET all auhtonticated user chats
exports.getAllUserChats = async (req, res, next) => {
  try {
    const userChats = await Chat.find({ members: { $in: [req.userId] } });
    res.status(200).json({ chats: userChats });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET chat with specific user
exports.getChatWithUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.userId, userId] },
    });
    res.status(200).json({ chat });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
