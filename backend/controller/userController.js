const User = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");

// Sign Up User
exports.signupUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  const devBookUrl = `${process.env.LOCALHOST}/`;

  const message = `Welcome to DevBook, ${user.name}. You are registered successfully.\n Start exploring now!\nClick to visit DevBook: \n${devBookUrl}`;

  sendToken(user, 201, res);

  try {
    await sendEmail({
      email: user.email,
      subject: `DeevBook Registration Successfull`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `A successfull registration Email sent to ${user.email}`,
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

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassord Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPassowrdUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;

  const resetPassowrdUrl = `${process.env.LOCALHOST}/password/reset/${resetToken}`;

  const message = `Your password reset token is:- \n\n ${resetPassowrdUrl} \n\nIf you have not requested this email then, please ignore this.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `DevBook Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassowrd = catchAsyncError(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password (Password change)
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  // If everything matched
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
