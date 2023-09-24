const User = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler")

// Sign Up User
exports.signupUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  const message = `Welcome to DevBook, ${user.name}. You are registered successfully.\n Start exploring now!`;

  sendToken(user, 201, res);

  try {
    await sendEmail({
      email: user.email,
      subject: `Registration Successfull`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  // If not matched
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPassmatched = await user.comparePassword(password);

  if (!isPassmatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // If everything matched
  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("devbookToken", null, {
    expires: new Date(Date.now()),
    httonly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out",
  });
});
