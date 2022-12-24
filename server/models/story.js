const { model } = require("mongoose");

const Schema = require("mongoose").Schema;

const storySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    image: { type: Object, default: "" },
    text: { type: String, default: "" },
    alignment: { type: String, default: "" },
    textBgColor: { type: String, default: "" },
    bgColor: { type: String, default: "" },
    viewis: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expireAt: {
      type: Date,
      expires: "24h",
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Storie", storySchema);
