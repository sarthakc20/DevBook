import React, { useEffect } from "react";
import logo from "../../images/DevbookLogo.png";
import coading from "../../images/coading1.png";
import join from "../../images/join.gif";
import "./Home.css";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import Post from "./postCard";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllPost } from "../../actions/postAction";
import Loader from "../../Loader/Loader";
import { getAllResources } from "../../actions/resourceAction";
import ResourceCard from "../Resource/ResourceCard";
import Carousel from "react-material-ui-carousel";

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, posts } = useSelector((state) => state.posts);

  const { resources } = useSelector((state) => state.resource);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllPost());

    dispatch(getAllResources());

    // Function to handle scroll event
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        // If the user scrolls down more than 100 pixels, show the button
        document.body.classList.add("show-back-to-top");
      } else {
        // Otherwise, hide the button
        document.body.classList.remove("show-back-to-top");
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`DevBook`} />
          <div className="homepage1" id="homeContainer1">
            <div className="banner">
              <h1>
                {user && user ? `Hello ${user.name}` : "JOIN OUR COMMUNITY"}
              </h1>

              <p>
                Welcome to <img src={logo} alt="logo" />
              </p>
              <h5 className="lorem">
                Read our resources, be a part of our resources and give your
                contribution. Join this massive developer community. Let's build
                the world's largest developer community together.
              </h5>

              <div className="buttons">
                <NavLink to={user ? `/community` : `/signup`}>
                  {user ? `Explore Community` : `Strat Now`}{" "}
                  <AiOutlineArrowRight id="icon" />
                </NavLink>
                <NavLink to={user ? `/resources` : `/signin`}>
                  {user ? `What's in Resources?` : `Sign In`}
                </NavLink>
              </div>
            </div>

            <div className="homepage2">
              <img src={coading} alt="coading" />
            </div>
          </div>

          <button
            className="back-to-top-button"
            onClick={() => window.scrollTo(0, 0)}
          >
            <AiOutlineArrowUp />
          </button>

          <div className="homepage3" id="homeContainer2">
            <h1>We have</h1>
            <div className="homepage3-sub">
              <p>1000+ Users</p>
              <p>5000+ Resources</p>
              <p>Strong Community Support</p>
            </div>

            <div className="homepage3-sub1">
              <h1>Built by developers, for developers</h1>
              <p>Our model maps to how you think and how you code.</p>
              <h5 className="lorem">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Placeat omnis vel cupiditate numquam! Id, ullam. Asperiores
                debitis voluptates molestiae saepe esse, accusantium fugiat
                dolor voluptatem omnis, quod at quae assumenda, rerum blanditiis
                laboriosam praesentium repellendus sed consequatur minima?
                Accusantium consectetur quisquam quasi quaerat voluptatem
                incidunt atque maiores officia explicabo tempora debitis, ab
                nesciunt fugiat, dolor unde vitae possimus adipisci veniam.
                Deleniti ducimus animi ex rem maxime, illo quod harum atque,
                quis et perferendis odio.
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
                  trends and best practices. Chnage your coading experience with
                  us.
                </p>
              </div>

              <div class="feature-box">
                <h2>Vibrant Developer Community</h2>
                <p>
                  Join a diverse and active community of developers from around
                  the world. Connect with like-minded professionals, ask
                  questions, share your experiences, and collaborate on
                  projects. DEVBOOK fosters a supportive and inclusive
                  environment for all.
                </p>
              </div>

              <div class="feature-box">
                <h2>Empower Others with Your Knowledge</h2>
                <p>
                  Share your insights, code snippets, and tutorials with the
                  DEVBOOK community. Build your personal brand as a thought
                  leader in your field. Your contributions help others learn and
                  grow, making DEVBOOK the go-to platform for developer
                  knowledge sharing.
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
              voluptates molestiae saepe esse, accusantium fugiat dolor
              voluptatem omnis, quod at quae assumenda, rerum blanditiis
              laboriosam praesentium repellendus sed consequatur minima?
              Accusantium consectetur quisquam quasi quaerat voluptatem incidunt
              atque maiores officia explicabo tempora debitis, ab nesciunt
              fugiat, dolor unde vitae possimus adipisci veniam. Deleniti
              ducimus animi ex rem maxime, illo quod harum atque, quis et
              perferendis odio.
            </h5>
          </div>

          <div className="preContainer">
            <h2>Some Of Our Resouces</h2>
          </div>

          <div className="containerRes">
            <Carousel className="caroselClass">
              {resources &&
                resources.map((resource) => (
                  <ResourceCard resource={resource} />
                ))}
            </Carousel>
          </div>

          <div className="homeComm">
            <NavLink to="/resources">View All Resources</NavLink>
          </div>

          <div className="preContainer">
            <h2>Some Of Our Community Posts</h2>
          </div>

          <div className="container" id="container">
            {posts && posts.slice(0,6).map((post) => <Post post={post} />)}
          </div>

          <div className="homeComm">
            <NavLink to="/community">View All Posts</NavLink>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
