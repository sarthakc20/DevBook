import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

const PostCard = ({ post }) => {
  const [open, setOpen] = useState(false);

  const commentToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating
    commentToggle();
  };
  return (
    <>
      <div className="postCard" to={`/community/${post._id}`}>
        {post.images && post.images[0] && post.images[0].url ? (
          <img src={post.images[0].url} alt={post.name} />
        ) : (
          <h4>No image available</h4>
        )}
        <p>{post.name}</p>
        <span>Topic :{post.topic}</span>
        <div>
          <span className="postcardSpan">
            {truncate(post?.description, 150)}
          </span>
        </div>
        <h5>Posted by {post.user}</h5>
        <div className="postCardBtn">
          <button onClick={commentToggle}>
            Comments ({post.numOfComments})
          </button>
          <NavLink className="readLink" to={`/community/${post._id}`}>
            Click To Read
          </NavLink>
        </div>
      </div>

      <Dialog
        aria-labelledby="Simple-dialog-title"
        open={open}
        maxWidth="xl"
        onClose={commentToggle}
        className="dialog"
      >
        <DialogTitle>Comments - {post.name}</DialogTitle>
        <DialogContent className="submitDialogActions">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index}>
                <p>
                  <strong>{comment.name}:</strong> {comment.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No Comments</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleButtonClick} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostCard;
