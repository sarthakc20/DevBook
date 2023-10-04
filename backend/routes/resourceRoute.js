const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createResource,
  getAllResource,
  deleteResource,
  myResources,
  getAllResourcesWithoutFilter,
} = require("../controller/resourceController");
const router = express.Router();

router.route("/resource/new").post(isAuthenticatedUser, createResource);

router.route("/resources").get(getAllResource);

router.route("/resources/nofilter").get(getAllResourcesWithoutFilter);

router.route("/me/resources").get(isAuthenticatedUser, myResources);

router.route("/me/resource/:id").delete(isAuthenticatedUser, deleteResource);

module.exports = router;
