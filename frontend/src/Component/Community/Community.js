import React, { useEffect, useState } from "react";
import PostCard from "../Home/postCard";
import { useAlert } from "react-alert";
import { NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllPost, getAllPostsWithoutFilter } from "../../actions/postAction";
import MetaData from "../Layout/MetaData";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import "./Community.css";
import { AiOutlinePlus } from "react-icons/ai";
import { RiFilter3Fill } from "react-icons/ri";
import Loader from "../../Loader/Loader.js";

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

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [topic, setTopic] = useState("");

  const { user } = useSelector((state) => state.user);

  const { posts: allPosts } = useSelector((state) => state.allPosts);

  const [keyword, setKeyword] = useState("");

   const [showResults, setShowResults] = useState(true);

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

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllPost(keyword, currentPage, topic));

    dispatch(getAllPostsWithoutFilter());

    setSearchParams();

    window.scrollTo(0, 0);
  }, [dispatch, error, alert, currentPage, topic]);

  let count = filteredPostsCount;

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      // Set the 'keyword' parameter in the URL
      setSearchParams({ keyword: keyword });
      dispatch(getAllPost(keyword, 1, topic));
    }
  };

  const handleResultClick = (search) => {
    setKeyword(search);

    setShowResults(false);
  };

  return (
    <>
      <div className="filterBox">
        <Typography>
          Topics <RiFilter3Fill />
        </Typography>
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>

          {showResults && ( // Show results container if showResults is true
            <div className="searchResultsContainer">
              {allPosts && allPosts
                .filter((item) => {
                  const name = item.name.toLowerCase();
                  return keyword && name.includes(keyword.toLowerCase());
                })
                .reduce((uniqueItems, item) => {
                  const name = item.name;
                  if (!uniqueItems.some((uniqueItem) => uniqueItem.name === name)) {
                    uniqueItems.push(item);
                  }
                  return uniqueItems;
                }, [])
                .map((item) => (
                  <div
                    key={item._id}
                    className="searchResultItem"
                    onClick={() => handleResultClick(item.name)}
                  >
                    {keyword &&
                      item.name.toLowerCase().includes(keyword.toLowerCase()) && (
                        <div>{item.name}</div>
                      )}
                  </div>
                ))}
            </div>
          )}

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
