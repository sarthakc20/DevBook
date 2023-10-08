const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassowrd,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  getAllUser,
} = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/signup").post(signupUser);

router.route("/signin").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassowrd);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/user/:id").get(getSingleUser);

router.route("/users").get(getAllUser);

// router.route("/me/avatar").put(isAuthenticatedUser, updateImage);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
