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
import { useEffect } from "react";

function App() {

  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
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
        <Route path="/resources" element={<Resource />} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
