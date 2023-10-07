import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { clearErrors, userAllPosts } from "../../actions/postAction";
import {
  getUserDetails,
  clearErrors as userClear,
} from "../../actions/userAction";
import Loader from "../../Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./userprofile.css";
import PostCard from "../Home/postCard";
import profilelogo from "../../images/user.png";

const UserProfile = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const { loading: postLoading=true ,error, userPosts } = useSelector((state) => state.userPosts);

  const {
    loading,
    error: userError,
    singleUser,
  } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClear());
    }

    dispatch(userAllPosts(id));

    dispatch(getUserDetails(id));

    window.scrollTo(0, 0);
  }, [dispatch, error, alert, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${singleUser.name} - Profile`} />
          <div className="ProfileInfo">
            {singleUser.avatar ? (
              <img src={singleUser.avatar.url} alt={singleUser.name} />
            ) : (
              <img src={profilelogo} alt={singleUser.name} />
            )}
            <div>
              <h2>{singleUser.name}</h2>
              <span>{singleUser.email}</span>
              <p>
                Joined DevBook On{" "}
                {String(singleUser.createdAt).substring(0, 10)}
              </p>
            </div>
          </div>

          {postLoading ? (
        <Loader />
      ) : (
        <>

          <div className="infoContainer">
            <h1 className="mypostHeading">
              {singleUser && singleUser.name}'s Community Posts
            </h1>
            <p>{userPosts.length} Posts</p>
            {userPosts && userPosts.length > 0 ? (
              <div className="posts" id="container">
                {userPosts && userPosts.map((post) => <PostCard post={post} />)}
              </div>
            ) : (
              <>
                <p className="mypostHeading">{user.name} has no post yet!</p>
                <NavLink className="readLink commLink" to="/community">
                  Check Community
                </NavLink>
              </>
            )}
          </div>
          </>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
