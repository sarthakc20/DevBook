import React from "react";
import error from "../../../images/error.png";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../MetaData";

const NotFound = () => {
  return (
    <>
    <MetaData title={`404 Not Found`} />
    <div className="PageNotFound">
      <img src={error} alt="404 Not Found" />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
    </>
  );
};

export default NotFound;
