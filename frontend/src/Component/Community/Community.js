import React, { useEffect, useState } from "react";
import PostCard from "../Home/postCard";
import { useAlert } from "react-alert";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllPost } from "../../actions/postAction";
import MetaData from "../Layout/MetaData";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import "./Community.css";
import { AiOutlinePlus } from "react-icons/ai";
import Loader from "../../Loader/Loader.js"

const topics = [
  "Development",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "Python",
  "All",
];

const Community = () => {
  const alert = useAlert();

  const { keyword } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [topic, setTopic] = useState("");

  const { user } = useSelector((state) => state.user);

  const {
    loading,
    error,
    posts,
    postsCount,
    resultPerPage,
    filteredPostsCount,
  } = useSelector((state) => state.posts);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllPost(keyword, currentPage, topic));

    window.scrollTo(0, 0);
  }, [dispatch, error, alert, keyword, currentPage, topic]);

  let count = filteredPostsCount;

  const [key, setKey] = useState();

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      navigate(`/community?${key}`);
    } else {
      navigate(`/community`);
    }
  };
  

  return (
    <>
      <div className="filterBox">
        <Typography>Topics</Typography>
        <ul className="topicBox">
          {topics.map((topic) => (
            <li
              className="topic-link"
              key={topic}
              onClick={() => setTopic(topic)}
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Community Post (${currentPage})`} />
          <h2 className="postsHeading">Our Community Posts</h2>

          {user && user ? (
            <NavLink to={`/community/new`} className="postTogg">
              <span className="postToggText">Create Post</span>
              <AiOutlinePlus />
            </NavLink>
          ) : null}

          <div className="searchBox">
            <form className="searchBox" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search Posts..."
                onChange={(e) => setKey(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>

          <h3 className="postFound">
            {count < 1
              ? "No Post Found"
              : count < 2
              ? "We Have 1 Post"
              : `We Have ${count} Posts`}
            !
          </h3>

          <div className="posts">
            {posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={postsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Community;
