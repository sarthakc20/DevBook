import React, { useEffect } from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import Loader from "../../Loader/Loader";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";
import { myPosts } from "../../actions/postAction";

const MyProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    user,
    loading = true,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const { posts } = useSelector((state) => state.myPosts);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin");
    }

    dispatch(myPosts());
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name.split(" ")[0]}'s Profile`} />
          <div className="profileContainer">
            <Sidebar />
            <div className="infoContainer">
              <Typography component="h1">My Profile</Typography>

              <div className="infoSummary">
                <div>
                  <p>
                    Name <br /> {user.name}
                  </p>
                </div>
                <div className="infoSummaryBox2">
                  <div>
                    <p>Total Posts</p>
                    <p>{posts && posts.length}</p>
                  </div>
                  <div>
                    <p>Email</p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <p>Joined On</p>
                    <p>{String(user.createdAt).substring(0, 10)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyProfile;
