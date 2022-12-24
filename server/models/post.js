const { Router } = require("express");
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    desc: { type: String, max: 800 },
    image: { type: Object },
    likes: { type: [String], default: [] },
    bookmark: { type: [String], default: [] },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
