import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  clearErrors,
  getAllResources,
  getAllResourcesWithoutFilter,
} from "../../actions/resourceAction";
import MetaData from "../Layout/MetaData";
import Pagination from "react-js-pagination";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ResourceCard from "./ResourceCard.js";
import "./Resource.css";
import Loader from "../../Loader/Loader";
import { RiFilter3Fill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const categories = [
  "AI-chatbot",
  "AI-chatbot Advanced",
  "AI Code Assistant",
  "Resume with AI",
  "Development with AI",
  "Design with AI",
  "SEO with AI",
  "Bugs Finder",
  "Auto Code Completion",
  "Documentation Generator",
  "All",
];

const Resource = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  const [keyword, setKeyword] = useState("");

  const [showResults, setShowResults] = useState(true);

  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  const { resources: allResources } = useSelector(
    (state) => state.allResources
  );

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

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllResources(keyword, currentPage, category));

    dispatch(getAllResourcesWithoutFilter());

    setSearchParams();

    window.scrollTo(0, 0);
  }, [dispatch, error, alert, currentPage, category]);

  let count = filteredresourcesCount;

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      // Set the 'keyword' parameter in the URL
      setSearchParams({ keyword: keyword });
      dispatch(getAllResources(keyword, 1, category));
    }
  };

  const handleResultClick = (search) => {
    setKeyword(search);

    setShowResults(false);
  };

  const mobileFilterBoxToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <>
      <div className="filterBox_Res desktop_visibility">
        <Typography className="typo">
          Categories <RiFilter3Fill />
        </Typography>
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

      <Dialog
        aria-labelledby="Simple-dialog-title"
        open={open}
        maxWidth="xl"
        onClose={mobileFilterBoxToggle}
        className="dialog"
      >
        <DialogTitle>
          Categories <RiFilter3Fill />
        </DialogTitle>
        <DialogContent className="submitDialogActions">
          <div className="filterBox_Res">
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
        </DialogContent>
        <DialogActions>
          <Button onClick={mobileFilterBoxToggle} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Resource (${currentPage})`} />

          {user && user ? (
            <NavLink to={`/resources/new`} className="postTogg">
              <span className="postToggText" id="resTogg">
                Add Yours
              </span>
              <AiOutlinePlus />
            </NavLink>
          ) : null}

          <div className="resBox">
            <h2 className="resourcesHeading">
              AI-Powered Coding Resources | Your Coding Journey Companion <br />
              <a href="#about">click here to know more</a>
            </h2>

            <div className="community__heading moile_visibility">
            <h2 className="postsHeading resheading">Our Resources</h2>
              <button
                className="filterbox__mobile"
                onClick={mobileFilterBoxToggle}
              >
                <RiFilter3Fill />
              </button>
            </div>

            <div className="searchBoxRes">
              <form onSubmit={searchSubmitHandler}>
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
                {allResources &&
                  allResources
                    .filter((item) => {
                      const name = item.name.toLowerCase();
                      return keyword && name.includes(keyword.toLowerCase());
                    })
                    .reduce((uniqueItems, item) => {
                      const name = item.name;
                      if (
                        !uniqueItems.some(
                          (uniqueItem) => uniqueItem.name === name
                        )
                      ) {
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
                          item.name
                            .toLowerCase()
                            .includes(keyword.toLowerCase()) && (
                            <div>{item.name}</div>
                          )}
                      </div>
                    ))}
              </div>
            )}

            <h3 className="resourceFound">
              {count < 1
                ? "No Resource Found"
                : count < 2
                ? "We Have 1 Resource"
                : `We Have ${count} Resources`}
              !
            </h3>

            <div className="resources">
              {resources &&
                resources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
            </div>

            {resultPerPage < count && (
              <div className="paginationBoxx" id="about">
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
              In the fast-paced world of technology and coding, staying
              up-to-date with the latest tools, frameworks, and resources is
              essential for anyone on a coding journey. Artificial Intelligence
              (AI) has emerged as a transformative force, revolutionizing
              industries and opening new horizons for developers. To help you
              navigate this exciting field, we have introduced the "Resources"
              feature on our website, designed to provide you with a
              comprehensive collection of AI websites, tools, and opportunities
              to contribute to the coding community.
            </p>
            <span>A Treasure Trove of AI Websites:</span>
            <p>
              Our "Resources" section serves as a treasure trove of carefully
              curated AI websites. Whether you are a seasoned AI practitioner or
              just starting your coding journey, you'll find something valuable
              here. Explore a wide range of websites that cover topics such as
              AI-chatbot, Resume Builder, Bugs Finder, computer vision, and
              more. Each website is accompanied by a brief description, helping
              you understand its focus and relevance.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Resource;
