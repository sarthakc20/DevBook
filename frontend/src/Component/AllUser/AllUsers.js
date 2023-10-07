import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearErrors, getAllUsers } from "../../actions/userAction";
import MetaData from "../Layout/MetaData";
import Loader from "../../Loader/Loader";
import UserCard from "./UserCard";

const AllUsers = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const [showResults, setShowResults] = useState(true);

  const { loading, error, users, filteredUsersCount } = useSelector(
    (state) => state.allUsers
  );

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers(keyword));

    setSearchParams();

    window.scrollTo(0, 0);
  }, [dispatch, error, alert]);

  let count = filteredUsersCount;

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      // Set the 'keyword' parameter in the URL
      setSearchParams({ keyword: keyword });
      dispatch(getAllUsers(keyword));
    }
  };

  const handleResultClick = (search) => {
    setKeyword(search);

    setShowResults(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`DevBook Creators`} />
          <h2 className="postsHeading">DevBook Community Creators</h2>
          <div className="searchBox">
            <form className="searchBox" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search User..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>

          {showResults && ( // Show results container if showResults is true
            <div className="searchResultsContainer">
              {users &&
                users
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

          <h3 className="postFound">
            {count < 1
              ? "No User Found"
              : count < 2
              ? "1 User"
              : `${count} Users`}
          </h3>

          <div className="posts">
            {users &&
              users.map((user) => <UserCard key={user._id} user={user} />)}
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;
