import React, { useEffect, useState } from "react";
import "./Signin.css";
import bg from "../../images/bg-up.png";
import { BiSolidUser } from "react-icons/bi";
import { MdMail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import profilelogo from "../../images/user.png";

const Signin = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profilelogo);

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
          <MetaData title={`Sign Up`} />
          <section>
            <div className="LoginSignUpContainer">
              <div className="contentBx">
                <div className="formBx">
                  <h2>Sign Up</h2>
                  <form onSubmit={registerSubmit}>
                    <div className="inputBx">
                      <span>
                        <BiSolidUser />
                      </span>
                      <input
                        type="text"
                        placeholder="name"
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="inputBx">
                      <span>
                        <MdMail />
                      </span>
                      <input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                      />
                    </div>

                    <div className="inputBx">
                      <span>
                        <BiSolidLock />
                      </span>
                      <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                      />
                    </div>

                    <div id="registerImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>

                    <div className="inputBx btn">
                      <input
                        type="submit"
                        value="Sign Up"
                        className="signin-btn"
                      />
                    </div>

                    <div className="inputBx">
                      <p>
                        Already have an account?
                        <NavLink to="/signin"> Sign In</NavLink>
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
      )}
    </>
  );
};

export default Signin;
