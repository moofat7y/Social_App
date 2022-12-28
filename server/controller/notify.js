const Notify = require("../models/notify");

exports.createNotify = async (req, res, next) => {
  try {
    const { id, recipients, url, text, content, image } = req.body;
    if (recipients.includes(req.userId)) {
      return;
    }
    const notify = new Notify({
      id,
      recipients,
      url,
      text,
      content,
      image: image ? image?.url : "",
      user: req.userId,
    });

    await notify.save();
    await notify.populate("user", "profilePicture username verified");
    return res.status(201).json({ notify });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// UPDATE is read
exports.updatedIsRead = async (req, res, next) => {
  const notifyId = req.params.id;
  try {
    const notify = await Notify.findByIdAndUpdate(
      notifyId,
      { isRead: true },
      { new: true }
    ).populate("user", "profilePic verified uesrname");
    res.status(200).json({ notify });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteNotify = async (req, res, next) => {
  const id = req.params.id;
  const url = req.query.url;

  try {
    const notify = await Notify.findOneAndDelete({ id, url });

    return res.status(200).json({ notify });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllUserNotify = async (req, res, next) => {
  try {
    const notifies = await Notify.find({ recipients: req.userId })
      .sort({ createdAt: -1 })
      .populate("user", "profilePicture username verified");

    return res.status(200).json({ notifies });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
