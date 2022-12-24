const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String },
    likes: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
