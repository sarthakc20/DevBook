import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import logo from "../../../images/DevbookLogo.png";
import { useSelector } from "react-redux";
import Loader from "../../../Loader/Loader";

const Header = () => {
  const [openMenue, setOpenMenue] = useState(false);

  const { loading, user } = useSelector((state) => state.user);

  function handleNavigation() {
    const select = document.getElementById("navigationSelect");
    const selectedOption = select.options[select.selectedIndex].value;

    switch (selectedOption) {
      case "Community":
        window.location.href = "/community";
        break;
      case "Learn":
        window.location.href = "/learn";
        break;
      default:
      // Handle any other options if needed
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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

                  {/* <select
                      id="navigationSelect"
                      required
                      onChange={handleNavigation}
                    >
                      <option value="" hidden>
                        Community
                      </option>
                      <option value="Community">Community</option>
                      <option value="Learn">Learn</option>
                    </select> */}

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
                        className="navbar-link"
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
                    {/* <select
                      id="navigationSelect"
                      required
                      onChange={handleNavigation}
                    >
                      <option value="" hidden>
                        Community
                      </option>
                      <option value="Community">Community</option>
                      <option value="Learn">Learn</option>
                    </select> */}

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
      )}
    </>
  );
};

export default Header;
