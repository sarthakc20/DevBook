import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getAllResources } from "../../actions/resourceAction";
import MetaData from "../Layout/MetaData";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import ResourceCard from "./ResourceCard.js";
import "./Resource.css";
import Loader from "../../Loader/Loader";

const categories = [
  "AI-chatbot",
  "AI Code Assistant",
  "Resume with AI",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "Python",
  "All",
];

const Resource = () => {
  const alert = useAlert();

  const { keyword } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  const {
    loading,
    error,
    resources,
    resourcesCount,
    resultPerPage,
    filteredresourcesCount,
  } = useSelector((state) => state.resource);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllResources(keyword, currentPage, category));

    window.scrollTo(0, 0);
  }, [dispatch, error, alert, keyword, currentPage, category]);

  let count = filteredresourcesCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Resource (${currentPage})`} />
          <div className="resBox">
            <h2 className="resourcesHeading">AI-Powered Coding Resources | Your Coding Journey Companion</h2>

            <h3 className="resourceFound">
              {count < 1
                ? "No Resource Found"
                : count < 2
                ? "We Have 1 Resource"
                : `We Have ${count} Resources`}{" "}
              !
            </h3>

            <div className="resources">
              {resources &&
                resources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
            </div>

            {resultPerPage < count && (
              <div className="paginationBoxx">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={resourcesCount}
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
          </div>

          <div className="aboutRes">
            <p>
            In the fast-paced world of technology and coding, staying up-to-date
            with the latest tools, frameworks, and resources is essential for
            anyone on a coding journey. Artificial Intelligence (AI) has emerged
            as a transformative force, revolutionizing industries and opening
            new horizons for developers. To help you navigate this exciting
            field, we have introduced the "Resources" feature on our website,
            designed to provide you with a comprehensive collection of AI
            websites, tools, and opportunities to contribute to the coding
            community. 
            </p>
            <span>A Treasure Trove of AI Websites:</span> 
            <p>
            Our "Resources" section
            serves as a treasure trove of carefully curated AI websites. Whether
            you are a seasoned AI practitioner or just starting your coding
            journey, you'll find something valuable here. Explore a wide range
            of websites that cover topics such as machine learning, deep
            learning, natural language processing, computer vision, and more.
            Each website is accompanied by a brief description, helping you
            understand its focus and relevance.
            </p>
          </div>
        </>
      )}

      <div className="filterBox">
        <Typography className="typo">Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Resource;
