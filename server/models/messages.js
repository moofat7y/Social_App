const { model } = require("mongoose");

const Schema = require("mongoose").Schema;

const messageSchema = new Schema(
  {
    chatId: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
