import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import logo from "../../../images/DevbookLogo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const [openMenue, setOpenMenue] = useState(false);

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className={openMenue ? "menuIcon active" : "menuIcon"}>
        {user && user ? (
          <nav>
            <ul className="navbar-list">
              <li className="logo">
                <NavLink
                  className="navbar-link"
                  style={{ textDecoration: "none" }}
                  to="/"
                  onClick={() => setOpenMenue(false)}
                >
                  <img className="logo_img" src={logo} alt="logo" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/"
                  exact
                  onClick={() => setOpenMenue(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/community"
                  onClick={() => setOpenMenue(false)}
                >
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/resources"
                  onClick={() => setOpenMenue(false)}
                >
                  Resources
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/about"
                  onClick={() => setOpenMenue(false)}
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/contact"
                  onClick={() => setOpenMenue(false)}
                >
                  Contact
                </NavLink>
              </li>

              <div className="sign-div">
                <li className="sign-btn">
                  <NavLink
                    className="navbar-link signin"
                    to="/account"
                    onClick={() => setOpenMenue(false)}
                  >
                    My Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="navbar-link signup"
                    to="/logout"
                    onClick={() => setOpenMenue(false)}
                  >
                    Logout
                  </NavLink>
                </li>
              </div>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="navbar-list">
              <li className="logo">
                <NavLink
                  className="navbar-link"
                  style={{ textDecoration: "none" }}
                  to="/"
                  onClick={() => setOpenMenue(false)}
                >
                  <img className="logo_img" src={logo} alt="logo" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/"
                  exact
                  onClick={() => setOpenMenue(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/community"
                  onClick={() => setOpenMenue(false)}
                >
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/resources"
                  onClick={() => setOpenMenue(false)}
                >
                  Resources
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/about"
                  onClick={() => setOpenMenue(false)}
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  to="/contact"
                  onClick={() => setOpenMenue(false)}
                >
                  Contact
                </NavLink>
              </li>

              <div className="sign-div">
                <li className="sign-btn">
                  <NavLink
                    className="navbar-link signin"
                    to="/signin"
                    onClick={() => setOpenMenue(false)}
                  >
                    Sign In
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="navbar-link signup"
                    to="/signup"
                    onClick={() => setOpenMenue(false)}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </div>
            </ul>
          </nav>
        )}

        <div className="mobile-nav">
          <BiMenu
            name="menu-outline"
            className="mobile-menu"
            onClick={() => setOpenMenue(true)}
          />
          <MdClose
            name="close-outline"
            className="mobile-close"
            onClick={() => setOpenMenue(false)}
          />
        </div>

        {/* <div className="mobile-logo">
        <NavLink to="/" onClick={() => setOpenMenue(false)}>
          <img src={logo} alt="logo" />
        </NavLink>
      </div> */}
      </div>
    </>
  );
};

export default Header;
