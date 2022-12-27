const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, max: 15 },
    lastname: { type: String, max: 15 },
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: Object, default: "" },
    coverPicture: { type: Object, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isAdmin: { type: Boolean, default: false },
    des: { type: String, max: 50, default: "" },
    from: { type: String, max: 50, default: "" },
    city: { type: String, max: 50, default: "" },
    gender: { type: String, default: "" },
    relationShip: { type: String, default: "" },
    story: { type: Object, default: "" },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
