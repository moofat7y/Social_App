const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const clearImage = require("../utils/clearImage");
const { default: mongoose } = require("mongoose");
const { compressImage } = require("../utils/compressImages");
const { cloudUpload, cloudDeleteImage } = require("../utils/cloudinaryImages");
// UPDATE User
exports.putUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    des,
    gender,
    relationShip,
    from,
    city,
  } = req.body;
  const errors = validationResult(req);
  const userId = req.params.userId;
  const loggedUserId = req.userId;
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.data = errors.array()[0];
      error.statusCode = 422;
      throw error;
    }
    if (userId !== loggedUserId) {
      const error = new Error("You can update you account only");
      error.data = "You can update you account only";
      error.statusCode = 403;
      throw error;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstname,
          lastname,
          username,
          des: des,
          from: from,
          city: city,
          gender: gender,
          relationShip,
        },
      },
      { new: true }
    );
    const { password, ...other } = updatedUser._doc;
    res
      .status(201)
      .json({ updatedUser: other, message: "Account has been updated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// UPDATE profile image
exports.updateProfilePicture = async (req, res, next) => {
  let image;
  let imagePath = req.file?.path.replace("\\", "/");
  try {
    if (!imagePath) {
      image = "";
    } else {
      const filepath = await compressImage(req.file.filename);
      const upload = await cloudUpload(filepath, "Profile images");
      image = {
        public_id: upload.public_id,
        url: upload.secure_url,
        path: filepath,
      };
    }
    const user = await User.findById(req.userId);
    if (user.profilePicture) {
      await cloudDeleteImage(user.profilePicture.public_id);
      clearImage(user.profilePicture.path);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        profilePicture: image,
      },
      { new: true }
    );

    res.status(201).json({ user: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// UPDATE cover image
exports.updateCoverImage = async (req, res, next) => {
  let image;
  let imagePath = req.file?.path.replace("\\", "/");

  try {
    if (!imagePath) {
      image = "";
    } else {
      const imagepath = await compressImage(req.file.filename);
      const upload = await cloudUpload(imagepath, "Profile images");
      image = {
        public_id: upload.public_id,
        url: upload.secure_url,
        path: imagepath,
      };
    }
    const user = await User.findById(req.userId);
    if (user.coverPicture) {
      await cloudDeleteImage(user.coverPicture.public_id);
      clearImage(user.coverPicture.path);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        coverPicture: image,
      },
      { new: true }
    );

    res.status(201).json({ updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// GET users by username
exports.getByUsername = async (req, res, next) => {
  const { userName } = req.params;
  const users = await User.find(
    { username: new RegExp(userName, "i") },
    { profilePicture: 1, _id: 1, username: 1, verified: 1 }
  );

  res.status(200).json({ users });
};

// DELETE user
exports.deleteUser = async (req, res, next) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.userId);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Password is incorrect");
      error.data = "Password is incorrect";
      error.statusCode = 403;
      throw error;
    }
    await User.findByIdAndDelete(req.userId);
    res.status(200).json({ message: "Your account has been deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET user by id
exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.data = "User not found";
      error.statusCode = 404;
      throw error;
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json({ user: other });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// FOLLOW a user
exports.followUser = async (req, res, next) => {
  const followedUserId = req.params.userId;

  try {
    const user = await User.findById(req.userId);
    const followedUser = await User.findById(followedUserId);

    if (!followedUser) {
      const error = new Error("this user not found");
      error.data = "this user not found";
      error.statusCode = 404;
      throw error;
    }
    if (req.userId === followedUserId) {
      const error = new Error("You can't follow your self");
      error.data = "You can't follow your self";
      error.statusCode = 403;
      throw error;
    }
    if (followedUser.followers.includes(req.userId)) {
      const error = new Error("You already followed this user");
      error.statusCode = 403;
      error.data = "You already followed this user";
      throw error;
    }
    await user.updateOne({
      $push: { followings: followedUserId },
    });

    const updatedUser = await User.findByIdAndUpdate(
      followedUserId,
      { $push: { followers: req.userId } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "followed successfuly", user: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// UNFOLLOW user
exports.unfollowUser = async (req, res, next) => {
  const unfollowedUserId = req.params.userId;
  try {
    const unfollowedUser = await User.findById(unfollowedUserId);

    if (!unfollowedUser) {
      const error = new Error("this user not found");
      error.data = "this user not found";
      error.statusCode = 404;
      throw error;
    }
    if (req.userId === unfollowedUser) {
      const error = new Error("You can't follow your self");
      error.data = "You can't follow your self";
      error.statusCode = 403;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!unfollowedUser.followers.includes(req.userId)) {
      const error = new Error("You don't follow this user");
      error.statusCode = 403;
      error.data = "You don't follow this user";
      throw error;
    }
    const updatedUser = await User.findByIdAndUpdate(
      unfollowedUserId,
      { $pull: { followers: req.userId } },
      { new: true }
    );
    await user.updateOne({ $pull: { followings: unfollowedUserId } });
    res.status(200).json({ message: "unfollowed", user: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get user suggistions
exports.getUserSuggetions = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $nin: [...user.followings, new mongoose.Types.ObjectId(req.userId)],
          },
        },
      },
      { $sample: { size: 6 } },

      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followings",
          foreignField: "_id",
          as: "followings",
        },
      },
    ]).project("-password");

    res.status(200).json({ users, length: users.length });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
