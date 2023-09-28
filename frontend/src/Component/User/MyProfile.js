import React, { useEffect } from "react";
import "./MyProfile.css";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import profile from "../../images/user.png";
import Loader from "../../Loader/Loader";

const MyProfile = () => {
    const navigate = useNavigate();

    const { user, loading=true, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/signin");
        }
    }, [navigate, isAuthenticated]);

  return ( 
  <>
    {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name.split(' ')[0]}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              
              <NavLink to="/me/update">Edit Profile</NavLink>
            </div>
            <div className="cont">
                <div className="contsub">
              <div>
                <h4>Full Name</h4>
                <div className="flexBox">
                <img src={profile} alt="image" className="profImg"/>
                <p>{user.name}</p>
                </div>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              </div>

              <div className="contsub btns">
                <NavLink to="/account/my/posts">My Pots</NavLink>
                <NavLink to="/account/my/resources">My Resources</NavLink>
                <NavLink to="/password/update">Change Password</NavLink>
              </div>
            </div>
          </div>
        </>
      )}
  </>
  )
}

export default MyProfile
