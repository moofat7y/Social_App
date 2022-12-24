const router = require("express").Router();
const commentController = require("../../controller/comment");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");
// Add comment
router.put(
  "/addcomment/:postId",
  [body("comment").notEmpty().isLength({ min: 1, max: 500 })],
  isAuth,
  commentController.putComment
);
// GET post comments
router.get("/:postId", isAuth, commentController.getAllPostComment);
// LIKE & DISLIKE comment
router.patch("/like/:commentId", isAuth, commentController.likeDislikeComment);
// DELELTE comment
router.delete(
  "/delete/:commentId/:postId",
  isAuth,
  commentController.deleteComment
);

module.exports = router;
