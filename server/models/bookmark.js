const { model } = require("mongoose");

const Schema = require("mongoose").Schema;

const bookmarkSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = model("Bookmark", bookmarkSchema);
