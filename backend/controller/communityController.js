const Community = require("../model/communityModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

// Create post
exports.createPost = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    // "string" means there is only one image
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "posts",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.name; // who posted

  req.body.userID = req.user._id; // user's ID

  req.body.userAvatar = req.user.avatar;
  
  const post = await Community.create(req.body);

  res.status(201).json({
    success: true,
    post
  });
});

// Get all posts
exports.getAllPosts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const postsCount = await Community.countDocuments();
  // In MongoDB, the countDocuments() method counts the number of documents that matches to the selection criteria.

  const apifeature = new ApiFeatures(Community.find(), req.query)
    .search()
    .filter();

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

// Get All Posts with any filter or pagination
exports.getAllPostsWithoutFilter = catchAsyncError(async (req, res, next) => {
  const posts = await Community.find();

  res.status(200).json({
    success: true,
    posts,
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

  // Update Images
  let images = [];

  if (typeof req.body.images === "string") {
    // "string" means there is only one image
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images from Cloudinary

    for (let i = 0; i < post.images.length; i++) {
      await cloudinary.v2.uploader.destroy(post.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "post",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

  // if (post.images) {
  //   // Delete the image from Cloudinary
  //   await cloudinary.v2.uploader.destroy(post.images.public_id);
  //   post.images = null;
  // }

  await post.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

// Get Logged in user posts
exports.myPosts = catchAsyncError(async (req, res, next) => {
  const posts = await Community.find({ userID: req.user._id }); // 'userID' field to filter

  res.status(200).json({
    success: true,
    posts,
  });
});

// Get posts by a specific user
exports.userPosts = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id; 

  const userPosts = await Community.find({ userID: userId }); // 'userID' field to filter

  res.status(200).json({
    success: true,
    userPosts,
  });
});


// Get All Comments of a Post
exports.getPostComment = catchAsyncError(async (req, res, next) => {
  const post = await Community.findById(req.query.id); //query is -> after equals to in postman

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: post.comments,
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
