const router = require("express").Router();
const isAuth = require("../middlewares/isAuth");
const storyControl = require("../../controller/story");
router.put("/", isAuth, storyControl.createStory);
router.get("/", isAuth, storyControl.getAllFollowingsUsersStories);
router.delete("/", isAuth, storyControl.deleteImage);
module.exports = router;
