import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import MetaData from "../Layout/MetaData";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { clearErrors, getPostDetails } from "../../actions/postAction";
import "./CommunityPostDetails.css";
import profile from "../../images/user.png";
import { MdEdit } from "react-icons/md";

const CommunityPostDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { post, loading, error } = useSelector((state) => state.postDetails);

  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const commentToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getPostDetails(id));

    window.scrollTo(0, 0);
  }, [dispatch, id, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${post.name}`} />

          {user && post.userID == user._id ? (
            <NavLink to={`/account/my/posts/${id}`} className="postTogg">
              <span className="postToggText">Edit My Post</span>
              <MdEdit />
            </NavLink>
          ) : null}

          <div className="PostDetails">
            <div>
              {post.images && post.images[0] && post.images[0].url ? (
                <img src={post.images[0].url} alt={post.name} />
              ) : (
                <h4>No image available</h4>
              )}
            </div>

            <div>
              <div className="detailsBlock-1">
                  <h2>{post.name}</h2>
                <p>Post # {post._id}</p>
                <h3>Posted by {post.user}</h3>
                <span>Topic :{post.topic}</span>
              </div>

              <div className="detailsBlock-2">
                <span>Description</span> : <p>{post.description}</p>
              </div>

              <div className="detailsBlock-3">
                <button className="cmntLink" onClick={commentToggle}>
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          <div className="comments">
            <h3 className="commentsHeading">COMMENTS</h3>

            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index}>
                  <p>
                    <img
                      src={profile}
                      alt="image"
                      className="profImg commentAvatar"
                    />
                    <strong>{comment.name}:</strong> {comment.comment}
                  </p>
                </div>
              ))
            ) : (
              <p>No Comments</p>
            )}
          </div>

          <Dialog
            aria-labelledby="Simple-dialog-title"
            open={open}
            maxWidth="xl"
            onClose={commentToggle}
            className="dialog"
          >
            <DialogTitle>Comments - {post.name}</DialogTitle>
            <DialogContent className="submitDialogActions"></DialogContent>
            <DialogActions>
              <Button onClick={commentToggle} color="primary">
                Add
              </Button>
              <Button onClick={commentToggle} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default CommunityPostDetails;
