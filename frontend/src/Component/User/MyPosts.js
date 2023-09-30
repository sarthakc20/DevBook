import React, { useEffect } from "react";
import Posts from "./MyPostCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myPosts } from "../../actions/postAction";
import { useAlert } from "react-alert";
import "./MyPosts.css";
import Loader from "../../Loader/Loader";
import MetaData from "../Layout/MetaData";
import { NavLink } from "react-router-dom";

const MyPosts = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, posts } = useSelector((state) => state.myPosts);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myPosts());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name.split(" ")[0]}'s Posts`} />
          <h1 className="mypostHeading">
            {user && user.name}'s Community Posts
          </h1>
          {posts && posts.length > 0 ? (
            <div className="container" id="container">
              {posts && posts.map((post) => <Posts post={post} />)}
            </div>
          ) : ( <>
            <p className="mypostHeading">You have no post yet!</p>
            <NavLink className="readLink commLink" to="/community">
            Check Community
          </NavLink>
          </>
          )}
        </>
      )}
    </>
  );
};

export default MyPosts;
