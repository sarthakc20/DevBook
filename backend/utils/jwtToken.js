// Create Token and Saving in Cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWT();

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.status(statusCode).cookie("devbookToken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
