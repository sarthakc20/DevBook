import React from "react";
import "./Logout.css";
import { logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

const Logout = () => {

    const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  };

  return (
    <div className="logout-container">
      <div className="logout-content">
        <h2>Logout</h2>
        <p>Are you sure you want to log out?</p>
        <button onClick={logoutHandler} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
