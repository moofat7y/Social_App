const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Bookmark = require("../models/bookmark");
const { cloudUpload, cloudDeleteImage } = require("../utils/cloudinaryImages");
const { validationResult } = require("express-validator");
const clearImage = require("../utils/clearImage");
const { compressImage } = require("../utils/compressImages");
// CREATE post
exports.putPost = async (req, res, next) => {
  const desc = req.body.desc;
  let image;
  const filePath = req.file?.path.replace("\\", "/");

  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    if (!filePath) {
      image = "";
    } else {
      const imagepath = await compressImage(req.file.filename);
      const result = await cloudUpload(imagepath, "Posts");
      image = {
        public_id: result.public_id,
        url: result.secure_url,
        path: imagepath,
      };
    }
    const creatorId = req.userId;
    const newPost = new Post({ userId: creatorId, desc, image });
    await newPost.save();
    await newPost.populate("userId", "-password");
    res.status(201).json(newPost);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET post
exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const userPost = await Post.findById(postId).populate(
      "userId likes",
      "_id username profilePicture"
    );
    if (!userPost) {
      const error = new Error("Post not found");
      error.data = "Post not found";
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Post fetched", result: userPost });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// GET all post
exports.getAllPost = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const posts = await Post.find({ userId: userId })
      .populate("userId", "username profilePicture _id")
      .sort({ createdAt: -1 });
    const { password, ...other } = user._doc;
    res.status(200).json({ user: other, posts: posts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const { desc, image } = req.body;
  try {
    const oldPost = await Post.findById(postId);
    if (!oldPost) {
      const error = new Error("Post not found");
      error.statusCode = 500;
      error.data = "Post not found";
      throw error;
    }
    if (oldPost.userId.toString() !== req.userId) {
      const error = new Error("You can update your posts only");
      error.data = "You can update your posts only";
      error.statusCode = 403;
      throw error;
    }
    await oldPost.updateOne({ $set: { desc, image } });
    res.status(200).json({ message: "Post updated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// DELETE post
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 500;
      error.data = "Post not found";
      throw error;
    }
    if (post.userId.toString() !== req.userId) {
      const error = new Error("You can update your posts only");
      error.data = "You can update your posts only";
      error.statusCode = 403;
      throw error;
    }
    post.populate("userId", "-password");
    if (post.image) {
      clearImage(post.image.path);
      await cloudDeleteImage(post.image.public_id);
    }
    await Comment.find({ postId: postId }).deleteMany();
    await Bookmark.find({ postId: post._id }).deleteMany();
    await post.deleteOne();

    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// LIKE & DISLIKE post
exports.likedislike = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate(
      "userId",
      "profilePicture username _id followers"
    );

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 500;
      error.data = "Post not found";
      throw error;
    }
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(String(req.userId));
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await post.save();
    res.status(200).json({ post: updatedPost });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET user timeline
exports.getTimeline = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const userFriendIds = user.followings;
    userFriendIds.push(req.userId);
    const timeline = await Post.find({ userId: { $in: userFriendIds } })
      .populate("userId", "username profilePicture _id")
      .sort({ createdAt: -1 });

    res.status(200).json(timeline);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET posts discover
exports.getPostsDiscover = async (req, res, next) => {
  const count = req.query.count || 1;
  const ITEM_PER_REQUEST = 10;
  try {
    const user = await User.findById(req.userId);

    const posts = await Post.aggregate([
      {
        $match: {
          userId: {
            $nin: [...user.followings, new mongoose.Types.ObjectId(req.userId)],
          },
        },
      },
      { $skip: (count - 1) * ITEM_PER_REQUEST },
      { $limit: ITEM_PER_REQUEST },
      { $sort: { createdAt: -1 } },
    ]).project("-password");
    res.status(200).json({ posts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
