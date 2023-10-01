import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { BiSolidLockOpen } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../Layout/MetaData";
import Loader from "../../Loader/Loader";

const UpdatePassword = () => {

const dispatch = useDispatch();

const alert = useAlert();

const navigate = useNavigate();

const { error, isUpdated, loading } = useSelector((state) => state.profile); 

const [oldPassword, setOldPassword] = useState("");

const [newPassword, setNewPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const updatePasswordSubmit = (e) => {
  e.preventDefault();

  const myForm = new FormData();

  myForm.set("oldPassword", oldPassword);
  myForm.set("newPassword", newPassword);
  myForm.set("confirmPassword", confirmPassword);

  dispatch(updatePassword(myForm));
};

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  if (isUpdated) {
    alert.success("Password Updated Successfully");

    navigate("/account");

    dispatch({
      type: UPDATE_PASSWORD_RESET,
    });
  }
}, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <BiSolidLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <BiSolidLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
