const Community = require("../model/communityModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// Create post
exports.createPost = catchAsyncError(async (req, res, next) => {
  const image = req.body.image;

  if (typeof image === "string") {
    // If it's a string, there is only one image
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "posts",
    });

    const imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    req.body.image = imageLink;
  }

  req.body.user = req.user.id; // mongoose.Schema.ObjectId

  const post = await Community.create(req.body);

  res.status(201).json({
    success: true,
    post,
  });
});

// Get all posts
exports.getAllPosts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const postsCount = await Community.countDocuments();
  // In MongoDB, the countDocuments() method counts the number of documents that matches to the selection criteria.

  const apifeature = new ApiFeatures(Community.find(), req.query).search();

  let posts = await apifeature.query;

  let filteredPostsCount = posts.length;

  apifeature.pagination(resultPerPage);

  posts = await apifeature.query.clone();

  res.status(200).json({
    success: true,
    posts,
    postsCount,
    resultPerPage,
    filteredPostsCount,
  });
});

//Get post details
exports.getPostDetails = catchAsyncError(async (req, res, next) => {
  const post = await Community.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Update post
exports.updatePost = catchAsyncError(async (req, res, next) => {
  let post = await Community.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  // Update Image
  const image = req.body.image;

  if (image !== undefined) {
    // Delete the old image from Cloudinary
    await cloudinary.v2.uploader.destroy(post.image.public_id);

    // Upload the new image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "posts",
    });

    const imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    req.body.image = imageLink;
  }

  post = await Community.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindModify: false,
  });

  res.status(200).json({
    success: true,
    post,
  });
});

// Delete post
exports.deletePosts = catchAsyncError(async (req, res, next) => {
  const post = await Community.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  if (post.image) {
    // Delete the image from Cloudinary
    await cloudinary.v2.uploader.destroy(post.image.public_id);
    post.image = null;
  }

  await post.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

// Create New post comment or Update the comment
exports.createPostComment = catchAsyncError(async (req, res, next) => {
  const { comment, postId } = req.body;

  const newComment = {
    user: req.user._id,
    name: req.user.name,
    comment,
  };

  const post = await Community.findById(postId);

  const isComment = post.comments.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isComment) {
    post.comments.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
      }
    });
  } else {
    post.comments.push(newComment);
    post.numOfComments = post.comments.length;
  }

  await post.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});
