const isAuth = require("../middlewares/isAuth");
const router = require("express").Router();
const notifyControl = require("../../controller/notify");
router.put("/", isAuth, notifyControl.createNotify);
router.delete("/:id", isAuth, notifyControl.deleteNotify);
router.get("/getNotifies", isAuth, notifyControl.getAllUserNotify);
module.exports = router;
