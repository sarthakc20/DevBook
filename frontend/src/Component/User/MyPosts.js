import React, { useEffect } from "react";
import Posts from "./MyPostCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myPosts } from "../../actions/postAction";
import { useAlert } from "react-alert";
import "./MyPosts.css";
import Loader from "../../Loader/Loader";
import MetaData from "../Layout/MetaData";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DELETE_POST_RESET } from "../../constants/postConstants";

const MyPosts = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading:postloading, error, posts } = useSelector((state) => state.myPosts);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.editPost
  );

  const { loading=true, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Post Deleted Successfully");
      dispatch({ type: DELETE_POST_RESET });
    }

    dispatch(myPosts());
  }, [dispatch, alert, error, isDeleted, deleteError]);

  return (
    <>
      {(loading || postloading) ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name.split(" ")[0]}'s Posts`} />
          <div className="profileContainer">
            <Sidebar />
            <div className="infoContainer">
              <h1 className="mypostHeading">
                {user && user.name}'s Community Posts
              </h1>
              {posts && posts.length > 0 ? (
                <div className="posts" id="container">
                  {posts && posts.map((post) => <Posts post={post} />)}
                </div>
              ) : (
                <>
                  <p className="mypostHeading">You have no post yet!</p>
                  <NavLink className="readLink commLink" to="/community">
                    Check Community
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyPosts;
