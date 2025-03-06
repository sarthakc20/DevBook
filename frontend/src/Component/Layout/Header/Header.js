import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import logo from "../../../images/DevbookLogo.png";
import { useSelector } from "react-redux";
import Loader from "../../../Loader/Loader";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { loading, user } = useSelector((state) => state.user);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    document.querySelector(".mobile-nav").classList.toggle("menu-open", !openMenu);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <header className="header">
          <div className={`menuIcon ${openMenu ? "active" : ""}`}>
            <nav>
              <ul className={`navbar-list ${openMenu ? "open" : ""}`}>
                <li className="logo">
                  <NavLink
                    className="navbar-link"
                    to="/"
                    onClick={() => setOpenMenu(false)}
                  >
                    <img className="logo_img" src={logo} alt="logo" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar-link"
                    to="/"
                    onClick={() => setOpenMenu(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar-link"
                    to="/community"
                    onClick={() => setOpenMenu(false)}
                  >
                    Community
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar-link"
                    to="/resources"
                    onClick={() => setOpenMenu(false)}
                  >
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar-link"
                    to="/about"
                    onClick={() => setOpenMenu(false)}
                  >
                    About us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar-link"
                    to="/contact"
                    onClick={() => setOpenMenu(false)}
                  >
                    Contact
                  </NavLink>
                </li>

                <div className="sign-div">
                  {user ? (
                    <>
                      <li className="sign-btn">
                        <NavLink
                          className="navbar-link"
                          to="/account"
                          onClick={() => setOpenMenu(false)}
                        >
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="navbar-link signup"
                          to="/logout"
                          onClick={() => setOpenMenu(false)}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="sign-btn">
                        <NavLink
                          className="navbar-link signin"
                          to="/signin"
                          onClick={() => setOpenMenu(false)}
                        >
                          Sign In
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="navbar-link signup"
                          to="/signup"
                          onClick={() => setOpenMenu(false)}
                        >
                          Sign Up
                        </NavLink>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </nav>
          </div>

          <div className="mobile-nav">
          <MdClose className="mobile-close" onClick={toggleMenu} />
          <BiMenu className="mobile-menu" onClick={toggleMenu} />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
