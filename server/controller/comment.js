const { validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("../models/post");

// PUT comment
exports.putComment = async (req, res, next) => {
  const { postId } = req.params;
  const text = req.body.comment;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("This post not found");
      error.data = "This post not found";
      error.statusCode = 404;
      throw error;
    }
    const newComment = new Comment({
      postId: post._id,
      userId: req.userId,
      comment: text,
    });
    post.comments.push(newComment._id);
    await post.save();
    await newComment.save();
    await newComment.populate("userId", "_id profilePicture username");
    res.status(201).json({ comment: newComment });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// GET all post comments
exports.getAllPostComment = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("This post not found");
      error.data = "This post not found";
      error.statusCode = 404;
      throw error;
    }

    const comments = (
      await (
        await post.populate("comments")
      ).populate("comments.userId", "profilePicture _id username")
    ).comments;

    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// LIKE & DISLIKE comment
exports.likeDislikeComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("This comment not found");
      error.data = "This comment not found";
      error.statusCode = 404;
      throw Error;
    }
    const likeIndex = comment.likes.findIndex(
      (id) => id === String(req.userId)
    );
    if (likeIndex === -1) {
      comment.likes.push(String(req.userId));
    } else {
      comment.likes = comment.likes.filter((id) => id !== String(req.userId));
    }
    const updatedComment = await comment.save();
    await updatedComment.populate("userId", "_id profilePicture username");
    res.status(201).json({ comment: updatedComment });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// DELETE comment
exports.deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("This comment not found");
      error.data = "This comment not found";
      error.statusCode = 404;
      throw error;
    }
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("This post not found");
      error.data = "This post not found";
      error.statusCode = 404;
      throw error;
    }
    if (
      comment.userId.toString() === req.userId ||
      post.userId.toString() === req.userId
    ) {
      post.comments = post.comments.filter((id) => String(id) !== commentId);
      await post.save();
      await comment.deleteOne();
    } else {
      const error = new Error("You can delete your comments only");
      error.data = "You can delete your comments only";
      error.statusCode = 403;
      throw error;
    }
    await comment.populate("userId", "_id profilePicture username");
    res.status(200).json({ comment });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
    }
    next(err);
  }
};
