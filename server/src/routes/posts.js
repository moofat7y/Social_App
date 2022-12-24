const router = require("express").Router();
const isAuth = require("../middlewares/isAuth");
const postsControll = require("../../controller/post");
const { body } = require("express-validator");
// PUT post
router.put(
  "/",
  isAuth,
  [body("desc").notEmpty().isLength({ max: 800 })],
  postsControll.putPost
);
// GET post
router.get("/post/:postId", isAuth, postsControll.getPost);
// GET all posts
router.get("/posts/:userId", isAuth, postsControll.getAllPost);
// UPDATE post
router.patch("/edit/:postId", isAuth, postsControll.updatePost);
// DELETE post
router.delete("/post/:postId", isAuth, postsControll.deletePost);
// LIKE&DISLIKE post
router.patch("/like/:postId", isAuth, postsControll.likedislike);
//  GET timeline
router.get("/usertimeline/timeline", isAuth, postsControll.getTimeline);
// GET discover posts
router.get("/discover/", isAuth, postsControll.getPostsDiscover);
module.exports = router;
