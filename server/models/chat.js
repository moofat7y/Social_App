const { model } = require("mongoose");

const Schema = require("mongoose").Schema;

const chatSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("Chat", chatSchema);
