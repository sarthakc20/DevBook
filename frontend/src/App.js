import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./Component/Layout/Header/Header";
import Home from "./Component/Home/Home";
import Signin from "./Component/User/Signin";
import Signup from "./Component/User/Signup";
import Footer from "./Component/Layout/Footer/Footer";
import About from "./Component/Layout/About/About";
import Contact from "./Component/Layout/Contact/Contact";
import Community from "./Component/Community/Community";
import Resource from "./Component/Resource/Resource";
import CreateResource from "./Component/Resource/CreateResource";
import MyResources from "./Component/Resource/MyResources";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import { useSelector } from "react-redux";
import Logout from "./Component/User/Logout";
import CreateCommunity from "./Component/Community/CreateCommunity";
import CommunityPostDetails from "./Component/Community/CommunityPostDetails";
import Profile from "./Component/User/MyProfile"
import MyPosts from "./Component/User/MyPosts"
import UpdateMyPost from "./Component/User/UpdateMyPost"
import UpdatePassword from "./Component/User/UpdatePassword"
import UpdateProfile from "./Component/User/UpdateProfile"
import ForgotPassword from "./Component/User/ForgotPassword"
import ResetPassword from "./Component/User/ResetPassword"

function App() {

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<Community />} />
        {/* <Route path="/community/:keyword" element={<Community />} /> */}
        <Route path="/resources" element={<Resource />} />
        <Route path="/community/:id" element={<CommunityPostDetails />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/community/new" element={<CreateCommunity />} />
        <Route path="/resources/new" element={<CreateResource />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/account/my/posts" element={<MyPosts />} />
        <Route path="/account/my/posts/:id" element={<UpdateMyPost />} />
        <Route path="/account/my/resources" element={<MyResources />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
