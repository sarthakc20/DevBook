import React, { useEffect, useState } from "react";
import "./Signin.css";
import bg from "../../images/bg-in.png";
import { MdMail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";

const Signin = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
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
                  <form onSubmit={loginSubmit}>
                    <div className="inputBx">
                      <span>
                        <MdMail />
                      </span>
                      <input
                        type="email"
                        placeholder="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>

                    <div className="inputBx">
                      <span>
                        <BiSolidLock />
                      </span>
                      <input
                        type="password"
                        placeholder="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>

                    <div className="inputBx btn">
                      <input
                        type="submit"
                        value="Sign In"
                        className="signin-btn"
                      />
                    </div>

                    <div className="inputBx">
                      <p>
                        Don't have an account?{" "}
                        <NavLink to="/signup">Sign Up</NavLink>
                      </p>
                    </div>

                    <div className="inputBx">
                      <p>
                        <NavLink to="/password/forgot">
                          Forgot Password ?
                        </NavLink>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Signin;
