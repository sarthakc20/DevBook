const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { createResource, getAllResource, deleteResource } = require("../controller/resourceController");
const router = express.Router();

router.route("/resource/new").post(isAuthenticatedUser, createResource);

router.route("/resources").get(getAllResource);

router.route("/me/resource/:id").delete(isAuthenticatedUser, deleteResource);

module.exports = router;