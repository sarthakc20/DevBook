import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import Loader from "../../Loader/Loader";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";
import { myPosts } from "../../actions/postAction";
import { UPDATE_AVATAR_RESET } from "../../constants/userConstants";
import { clearErrors, loadUser, updateAvatar } from "../../actions/userAction";
import profilelogo from "../../images/user.png";
import { useAlert } from "react-alert";

const MyProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const alert = useAlert();

  const {
    user,
    loading = true,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const { posts } = useSelector((state) => state.myPosts);

  const { error, isUpdated } = useSelector((state) => state.profile);

  const [avatarPreview, setAvatarPreview] = useState(profilelogo);

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin");
    }

    dispatch(myPosts());
    
    if (user) {
      if (user.avatar) {
        setAvatarPreview(user.avatar.url);
      } else {
        setAvatarPreview(profilelogo);
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Picture Updated Successfully");
      dispatch(loadUser());

      dispatch({
        type: UPDATE_AVATAR_RESET,
      });
    }
  }, [dispatch, navigate, isAuthenticated, isUpdated, error, user, alert]);

  const updateAvatarSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("avatar", avatar);
    dispatch(updateAvatar(myForm));
  };

  const updateAvatarDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user && user.name.split(" ")[0]}'s Profile`} />
          <div className="profileContainer">
            <Sidebar />
            <div className="infoContainer">
              <Typography component="h1">My Profile</Typography>

              <div className="updateImageBox">
                {user && user.avatar ? (
                  <img src={user.avatar.url} alt={user.name} />
                ) : (
                  <form
                    className="updateAvatarForm"
                    onSubmit={updateAvatarSubmit}
                  >
                    <div id="updateAvatarImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateAvatarDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Update"
                      className="updateAvatarBtn"
                    />
                  </form>
                )}
              </div>

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
