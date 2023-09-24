const express = require("express");
const { createPost, getAllPosts, getPostDetails, updatePost, deletePosts, getPostComment, createPostComment } = require("../controller/communityController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/community/new").post(isAuthenticatedUser, createPost);

router.route("/community").get(getAllPosts);

router.route("/community/:id").get(getPostDetails);

router.route("/me/community/:id").put(isAuthenticatedUser, updatePost);

router.route("/me/community/:id").delete(isAuthenticatedUser, deletePosts);

router.route("/comments").get(getPostComment);

router.route("/comment").put(isAuthenticatedUser, createPostComment);

module.exports = router;

