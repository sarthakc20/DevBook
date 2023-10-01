import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myResources } from "../../actions/resourceAction";
import MyResourceCard from "../User/MyResourceCard";
import Sidebar from "../User/Sidebar";
import MetaData from "../Layout/MetaData";
import Loader from "../../Loader/Loader";
import { NavLink } from "react-router-dom";
import { DELETE_RESOURCE_RESET } from "../../constants/resourceConstant";

const MyResources = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, resources } = useSelector(
    (state) => state.myResources
  );

  const { user } = useSelector((state) => state.user);

  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteResource);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Resource Deleted Successfully");
      dispatch({ type: DELETE_RESOURCE_RESET });
    }

    dispatch(myResources());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name.split(" ")[0]}'s Resources`} />
          <div className="profileContainer">
            <Sidebar />
            <div className="infoContainer">
              <h1 className="mypostHeading">{user && user.name}'s Resources</h1>
              {resources && resources.length > 0 ? (
                <div className="posts" id="container">
                  {resources &&
                    resources.map((resource) => (
                      <MyResourceCard resource={resource} />
                    ))}
                </div>
              ) : (
                <>
                  <p className="mypostHeading">You have no resource yet!</p>
                  <NavLink className="readLink commLink" to="/resources">
                    Check Resources
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyResources;
