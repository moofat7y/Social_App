const router = require("express").Router();
const isAuth = require("../middlewares/isAuth");
const bookmarkControl = require("../../controller/bookmark");
router.put("/", isAuth, bookmarkControl.createAndDeleteBookMark);
// GET all bookmarks
router.get("/", isAuth, bookmarkControl.getAllBookMarks);
module.exports = router;
