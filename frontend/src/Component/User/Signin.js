import React from "react";
import "./Signin.css";
import bg from "../../images/bg-in.png";
import { MdMail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Signin = () => {
  return (
    <>
    <MetaData title={`Sign In`} />
      <section>
      <div className="LoginSignUpContainer">
        <div className="imgBx">
          <img src={bg} alt="bg-signin" className="img" />
        </div>

        <div className="contentBx">
          <div className="formBx">
            <h2>Sign In</h2>
            <form>
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
                <input type="submit" value="Sign In" className="signin-btn"/>
              </div>

              <div className="inputBx">
                <p>
                  Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
                </p>
              </div>

              <div className="inputBx">
                <p>
                <NavLink to="/password/forgot">Forgot Password ?</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
