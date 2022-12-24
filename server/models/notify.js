const { model, default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const notifySchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    recipients: [Schema.Types.ObjectId],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Notify", notifySchema);
