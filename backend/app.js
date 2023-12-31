const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");   

const errorMiddleware = require("./middleware/error");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const user = require("./routes/userRoute");
const community = require("./routes/communityRoute");
const resource = require("./routes/resourceRoute");

app.use("/api/v1", user);
app.use("/api/v1", community);
app.use("/api/v1", resource);

// Let Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../frontend/build/index.html"));
});

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
