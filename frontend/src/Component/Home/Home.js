import React from "react";
import logo from "../../images/DevbookLogo.png";
import coading from "../../images/coading1.png";
import join from "../../images/join.gif";
import "./Home.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Home = () => {
  return (
    <>
    <MetaData title={`DevBook`} />
      <div className="homepage1">
        <div className="banner">
          <h1>JOIN OUR COMMUNITY</h1>
          <p>
            Welcome to <img src={logo} alt="logo" />
          </p>
          <h5 className="lorem">
            Read our resources, be a part of our resources and give your
            contribution. Join this massive developer community. Let's build the
            world's largest developer community together.
          </h5>

          <div className="buttons">
            <NavLink to="/signup">
              Start Now <AiOutlineArrowRight id="icon" />
            </NavLink>
            <NavLink to="/signin">Sign In</NavLink>
          </div>
        </div>

        <div className="homepage2">
          <img src={coading} alt="coading" />
        </div>
      </div>

      <div className="homepage3">
        <h1>We have</h1>
        <div className="homepage3-sub">
          <p>100+ Users</p>
          <p>500+ Resources</p>
          <p>Strong Community Support</p>
        </div>

        <div className="homepage3-sub1">
          <h1>Built by developers, for developers</h1>
          <p>Our model maps to how you think and how you code.</p>
          <h5 className="lorem">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
            omnis vel cupiditate numquam! Id, ullam. Asperiores debitis
            voluptates molestiae saepe esse, accusantium fugiat dolor voluptatem
            omnis, quod at quae assumenda, rerum blanditiis laboriosam
            praesentium repellendus sed consequatur minima? Accusantium
            consectetur quisquam quasi quaerat voluptatem incidunt atque maiores
            officia explicabo tempora debitis, ab nesciunt fugiat, dolor unde
            vitae possimus adipisci veniam. Deleniti ducimus animi ex rem
            maxime, illo quod harum atque, quis et perferendis odio.
          </h5>
        </div>

        <div className="homepage4">
          <img src={join} alt="join" />
        </div>

        <div className="homepage4-1">
          <div class="feature-box">
            <h2>Rich Developer Knowledge Base</h2>
            <p>
              Access a comprehensive library of articles, tutorials, and
              documentation covering a wide range of programming languages,
              tools, and technologies. Stay updated with the latest industry
              trends and best practices.
            </p>
          </div>

          <div class="feature-box">
            <h2>Vibrant Developer Community</h2>
            <p>
              Join a diverse and active community of developers from around the
              world. Connect with like-minded professionals, ask questions,
              share your experiences, and collaborate on projects. DEVBOOK
              fosters a supportive and inclusive environment for all.
            </p>
          </div>

          <div class="feature-box">
            <h2>Empower Others with Your Knowledge</h2>
            <p>
              Share your insights, code snippets, and tutorials with the DEVBOOK
              community. Build your personal brand as a thought leader in your
              field. Your contributions help others learn and grow, making
              DEVBOOK the go-to platform for developer knowledge sharing.
            </p>
          </div>
        </div>
      </div>

      <div className="homepage5">
        <h1>Our Strong Community</h1>
        <h2>Don't just take our word for it</h2>
        <p>
          Find out why devBook is the most used platform for the developers
          community.
        </p>

        <div className="buttons last-btn">
          <NavLink to="/community">Our Community</NavLink>
          <NavLink to="/Resources">
            Resources <AiOutlineArrowRight id="icon" />
          </NavLink>
        </div>
        <h1>Our Most Reliable Resources</h1>
        <h2>Don't just take our word for it</h2>
        <p>
          Find out the most reliable resources which can make your developer
          journey easier.
        </p>

        <h5 className="lorem">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
            omnis vel cupiditate numquam! Id, ullam. Asperiores debitis
            voluptates molestiae saepe esse, accusantium fugiat dolor voluptatem
            omnis, quod at quae assumenda, rerum blanditiis laboriosam
            praesentium repellendus sed consequatur minima? Accusantium
            consectetur quisquam quasi quaerat voluptatem incidunt atque maiores
            officia explicabo tempora debitis, ab nesciunt fugiat, dolor unde
            vitae possimus adipisci veniam. Deleniti ducimus animi ex rem
            maxime, illo quod harum atque, quis et perferendis odio.
          </h5>
      </div>
    </>
  );
};

export default Home;
