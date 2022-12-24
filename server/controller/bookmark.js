const { default: mongoose } = require("mongoose");
const Bookmark = require("../models/bookmark");
const Post = require("../models/post");
// Put new bookmark
exports.createAndDeleteBookMark = async (req, res, next) => {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("This post not found");
      error.statusCode = 404;
      throw error;
    }
    if (
      post?.bookmark?.findIndex(
        (id) => req.userId.toString() === id.toString()
      ) >= 0
    ) {
      post.bookmark = post.bookmark.filter((id) => id !== req.userId);
      await post.save();
      await Bookmark.findOneAndDelete({ postId: post._id });
      res.status(200).json({ postId });
    } else {
      const newBookMark = new Bookmark({ postId, userId: req.userId });
      await newBookMark.save();
      post.bookmark.push(req.userId);
      await post.save();
      res.status(201).json({ newBookMark });
    }
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET user bookMarks
exports.getAllBookMarks = async (req, res, next) => {
  try {
    const bookMarks = await Bookmark.find({
      userId: new mongoose.Types.ObjectId(req.userId),
    }).populate("userId postId", "username profilePicture image");
    res.status(200).json(bookMarks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
