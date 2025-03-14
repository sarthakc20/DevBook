const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostDetails,
  updatePost,
  deletePosts,
  getPostComment,
  createPostComment,
  myPosts,
  getAllPostsWithoutFilter,
  userPosts,
  trackPostClick,
} = require("../controller/communityController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/community/new").post(isAuthenticatedUser, createPost);

router.route("/community").get(getAllPosts);

router.route("/community/nofilter").get(getAllPostsWithoutFilter);

router.route("/community/:id").get(getPostDetails);

router.route("/me/community/posts").get(isAuthenticatedUser, myPosts);

router.route("/community/user/:id").get(userPosts);

router.route("/me/community/:id").put(isAuthenticatedUser, updatePost);

router.route("/me/community/:id").delete(isAuthenticatedUser, deletePosts);

router.route("/comments").get(getPostComment);

router.route("/comment").put(isAuthenticatedUser, createPostComment);

router.route("/click/:id").put(isAuthenticatedUser, createPostComment);

router.put("/post/click/:id", trackPostClick);

module.exports = router;
