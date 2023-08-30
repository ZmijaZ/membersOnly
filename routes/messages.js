var express = require("express");
var router = express.Router();
const messagesController = require("../controller/messagesController");

/* GET users listing. */
router.get("/", messagesController.messagesMain);

router.get("/board", messagesController.messagesBoard);

router.get("/new", messagesController.messagesNewGet);
router.post("/new", messagesController.messagesNewPost);

module.exports = router;
