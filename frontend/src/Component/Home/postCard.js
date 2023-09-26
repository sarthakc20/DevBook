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

  // Prevent the click event from propagating to the parent NavLink
  const handleButtonClick = (e) => {
    e.stopPropagation();
    commentToggle();
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <>
      <NavLink className="postCard" to={`/community/${post._id}`}>
        <img src={post.image} alt={post.name} />
        <p>{post.name}</p>
        <span>Topic :{post.topic}</span>
        <div>
          <span className="postcardSpan">
            {truncate(post?.description, 150)}
          </span>
        </div>
        <h5>Posted by user</h5>
        <button onClick={handleButtonClick}>
          Comments ({post.numOfComments})
        </button>
      </NavLink>

      <Dialog
        aria-labelledby="Simple-dialog-title"
        open={open}
        maxWidth="xl"
        onClose={commentToggle}
        className="dialog"
      >
        <DialogTitle>Comments - {post.name}</DialogTitle>
        <DialogContent className="submitDialogActions">
          {/* {post.comments && post.comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={commentToggle} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostCard;
