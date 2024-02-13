const express = require("express");
const controller = require("../controllers");
const router = express.Router();


router.get('/get_all_messages_by_room',controller.messageController.getMessageByRoomId);



module.exports = router;