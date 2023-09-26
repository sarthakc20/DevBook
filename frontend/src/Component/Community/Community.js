import React, { useEffect, useState } from "react";
import PostCard from "../Home/postCard";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllPost } from "../../actions/postAction";
import MetaData from "../Layout/MetaData";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import "./Community.css";

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
  "All"
];

const Community = () => {
  const alert = useAlert();

  const { keyword } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [topic, setTopic] = useState("");

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
        "Loading..."
      ) : (
        <>
          <MetaData title={`Community Post (${currentPage})`} />
          <h2 className="postsHeading">Our Community Posts</h2>

          <h3 className="postFound">
            {count < 1
              ? "No Post Found"
              : count < 2
              ? "We Have 1 Post"
              : `We Have ${count} Posts`}{" "}
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
