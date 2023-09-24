const express = require("express");
const { signupUser, loginUser, logoutUser } = require('../controller/userController');
const router = express.Router();

router.route("/signup").post(signupUser);

router.route("/signin").post(loginUser);

router.route("/logout").get(logoutUser);

module.exports = router;