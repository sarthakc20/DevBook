import React from "react";
import "./Sidebar.css";
// import logo from "../../images/DevbookLogo.png";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { FaList, FaUserEdit, FaUsers } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidLockOpen, BiWorld } from "react-icons/bi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <div className="inner-side">
      <Link to="/account/my/posts">
        <p>
          <FaList /> My Posts
        </p>
      </Link>

      <Link to="/community/new">
        <p>
          <MdAddCircle /> Create Post
        </p>
      </Link>
      </div>

      <div className="inner-side">
      <Link to="/account/my/resources">
        <p>
          <FaList /> My Resources
        </p>
      </Link>

      <Link to="/resources/new">
        <p>
          <MdAddCircle /> Create Resource
        </p>
      </Link>
      </div>

      <Link to="/me/update">
        <p>
          <FaUserEdit /> Edit Profile
        </p>
      </Link>

      <Link to="/password/update">
        <p>
          <BiSolidLockOpen /> Change Password
        </p>
      </Link>

      <Link to="/users">
        <p>
          <FaUsers /> All Users
        </p>
      </Link>

      <Link to={`/users/${user._id}`}>
        <p>
          <BiWorld /> My Public Profile
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
