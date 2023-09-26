const express = require("express");
const { signupUser, loginUser, logoutUser, forgotPassword, resetPassowrd, getUserDetails, updatePassword, updateProfile } = require('../controller/userController');
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/signup").post(signupUser);

router.route("/signin").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassowrd);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;