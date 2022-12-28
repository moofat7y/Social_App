const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
const app = express();
const port = 8080;

const mongooseUri = process.env.MONGOOSE_URI;

// Routes
const authRoute = require("./src/routes/auth");
const postRoute = require("./src/routes/posts");
const bookmarkRoute = require("./src/routes/bookmark");
const userRoute = require("./src/routes/user");
const commentRouter = require("./src/routes/comment");
const chatRouter = require("./src/routes/chat");
const messageRouter = require("./src/routes/message");
const notifyRoute = require("./src/routes/notify");
const storyRoute = require("./src/routes/story");

// body parser

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// multer data
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Format" }, false);
  }
};
const diskStorage = multer.diskStorage({
  destination: (err, file, cb) => {
    cb(null, "images");
  },
  filename: (err, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.use(
  multer({
    storage: diskStorage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
  }).single("image")
);
app.use("/register", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRouter);
app.use("/bookmark", bookmarkRoute);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/notify", notifyRoute);
app.use("/story", storyRoute);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose.set("strictQuery", false);
mongoose.connect(mongooseUri, () => {
  console.log("connected");
  app.listen(process.env.PORT || port);
});
