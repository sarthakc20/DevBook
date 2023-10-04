const Resource = require("../model/resourceModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

// Create Resource
exports.createResource = catchAsyncError(async (req, res, next) => {
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

  const resource = await Resource.create(req.body);

  res.status(201).json({
    success: true,
    resource,
  });
});

// Get all Resource
exports.getAllResource = catchAsyncError(async (req, res) => {
  const resultPerPage = 9;
  const resourcesCount = await Resource.countDocuments();
  // In MongoDB, the countDocuments() method counts the number of documents that matches to the selection criteria.

  const apifeature = new ApiFeatures(Resource.find(), req.query)
    .search()
    .filter();

  let resources = await apifeature.query;

  let filteredresourcesCount = resources.length;

  apifeature.pagination(resultPerPage);

  resources = await apifeature.query.clone();

  res.status(200).json({
    success: true,
    resources,
    resourcesCount,
    resultPerPage,
    filteredresourcesCount,
  });
});

// Get All Resources with any filter or pagination
exports.getAllResourcesWithoutFilter = catchAsyncError(async (req, res, next) => {
  const resources = await Resource.find();

  res.status(200).json({
    success: true,
    resources,
  });
});

// Get Logged in user resources
exports.myResources = catchAsyncError(async (req, res, next) => {
  const resources = await Resource.find({ userID: req.user._id }); // 'userID' field to filter

  res.status(200).json({
    success: true,
    resources,
  });
});

// Delete Resource
exports.deleteResource = catchAsyncError(async (req, res, next) => {
    const resource = await Resource.findById(req.params.id);
  
    if (!resource) {
      return next(new ErrorHandler("Resource not found", 404));
    }
  
    // if (resource.image) {
    //   // Delete the image from Cloudinary
    //   await cloudinary.v2.uploader.destroy(resource.image.public_id);
    //   resource.image = null;
    // }
  
    await resource.deleteOne();
  
    return res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  });
