const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB id Error - (CastError)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error - (re-registration with same email)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error 
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, please try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Expire error 
    if (err.name === "TokenExpireError") {
        const message = `Json Web Token is expired, please try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
