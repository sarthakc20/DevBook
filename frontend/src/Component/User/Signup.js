import React from "react";
import "./Signin.css";
import bg from "../../images/bg-up.png";
import { BiSolidUser } from "react-icons/bi";
import { MdMail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Signin = () => {
  return (
    <>
    <MetaData title={`Sign Up`} />
      <section>
      <div className="LoginSignUpContainer">

        <div className="contentBx">
          <div className="formBx">
            <h2>Sign Up</h2>
            <form>

            <div className="inputBx">
                <span>
                  <BiSolidUser />
                </span>
                <input type="text" placeholder="name"/>
              </div>
              <div className="inputBx">
                <span>
                  <MdMail />
                </span>
                <input type="email" placeholder="email"/>
              </div>

              <div className="inputBx">
                <span>
                  <BiSolidLock />
                </span>
                <input type="password" placeholder="password"/>
              </div>

              <div className="inputBx btn">
                <input type="submit" value="Sign Up" className="signin-btn"/>
              </div>

              <div className="inputBx">
                <p>
                  Already have an account? <NavLink to="/signin">Sign In</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="imgBx">
          <img src={bg} alt="bg-signin" className="img" />
        </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
