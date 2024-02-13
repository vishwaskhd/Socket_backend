const express = require("express");
const controller = require("../controllers");
const router = express.Router();
const verifyToken = require("../middleware/auth");


router.post('/login',controller.userController.login);
router.get('/get_all_users',verifyToken,controller.userController.getAllUser);





module.exports = router;