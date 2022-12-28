const Story = require("../models/story");
const User = require("../models/user");
const clearImage = require("../utils/clearImage");
const { cloudDeleteImage, cloudUpload } = require("../utils/cloudinaryImages");
const { compressImage } = require("../utils/compressImages");
exports.createStory = async (req, res, next) => {
  const { text, alignment, bgColor, textBgColor } = req.body;
  let image;
  const filePath = req.file?.path.replace("\\", "/");

  try {
    if (!filePath) {
      image = "";
    } else {
      const imagepath = await compressImage(req.file.filename);
      const upload = await cloudUpload(imagepath, "Story");
      image = {
        public_id: upload.public_id,
        url: upload.secure_url,
        path: imagepath,
      };
    }
    const user = await User.findById(req.userId);
    if (user.story) {
      await cloudDeleteImage(user.story.public_id);
      clearImage(user.story.path);
    }
    const newStory = new Story({
      userId: req.userId,
      image,
      text,
      alignment,
      textBgColor,
      bgColor,
    });
    user.story = image;
    await user.save();
    await newStory.save();
    await newStory.populate(
      "userId",
      "profilePicture username followers verified"
    );

    res.status(201).json({ story: newStory });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllFollowingsUsersStories = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const stories = await Story.find({
      userId: { $in: [...user.followings, req.userId] },
    }).populate("userId", "username profilePicture _id verified");
    res.status(200).json({ stories });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const story = await Story.findOne({ userId: req.userId });
    if (story.expireAt > Date.now()) {
      const error = new Error("Story not expired yet");
      error.statusCode = 403;
      error.data = "Story not expired yet";
      throw error;
    }
    if (story.image) {
      clearImage(story.image);
    }

    console.log(story);
    res.status(200).json({ story });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
