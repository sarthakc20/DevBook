import React from "react";
import { NavLink } from "react-router-dom";
import profilelogo from "../../images/user.png";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <>
      <NavLink to={`/users/${user._id}`} className="userCard">
        <div className="ProfileCardInfo">
          {user.avatar ? (
            <img src={user.avatar.url} alt={user.name} />
          ) : (
            <img src={profilelogo} alt={user.name} />
          )}
          <div>
            <h2>{user.name}</h2>
            <span>{user.email}</span>
            <p>Joined DevBook On {String(user.createdAt).substring(0, 10)}</p>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default UserCard;
