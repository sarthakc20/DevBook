import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import {AiOutlineMail} from "react-icons/ai";
import {MdSwitchAccount} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../../Loader/Loader";
import MetaData from "../Layout/MetaData";

const UpdateProfile = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const navigate = useNavigate();
  
    const { user } = useSelector((state) => state.user); 

    const { error, isUpdated, loading } = useSelector((state) => state.profile); 
  
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        dispatch(updateProfile(myForm));
    };

    useEffect(() => {
        
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }  

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());

        navigate("/account");

        dispatch({
            type: UPDATE_PROFILE_RESET
        });
      }
    }, [dispatch, error, alert, isUpdated, navigate, user]);

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <MdSwitchAccount />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  readOnly
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      </>
    )}
  </>
  );
};

export default UpdateProfile;
