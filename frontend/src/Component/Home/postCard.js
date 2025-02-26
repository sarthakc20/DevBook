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
import { IoMdPricetags } from "react-icons/io";
import { BiSolidUser } from "react-icons/bi";
import { trackPostClick } from "../../actions/postAction";
import { useDispatch } from "react-redux";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const commentToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  // Function to handle post click tracking
  const handlePostClick = () => {
    dispatch(trackPostClick(post._id));
  };

  // Badge Logic
  const badges = [];

  const days = 3;
  const numberOfClicks = 4;
  const numberOfComments = 3;

  // 1. Check if post is new (created within the last 3 days)
  const createdAtDate = new Date(post.createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate - createdAtDate;
  const daysOld = timeDiff / (1000 * 60 * 60 * 24);
  if (daysOld <= days) {
    badges.push("New");
  }

  // 2. Check if post has a high number of clicks
  if (post.clicks && post.clicks > numberOfClicks) {
    badges.push("Popular");
  }

  // 3. Check if post has a high number of comments
  if (post.numOfComments && post.numOfComments > numberOfComments) {
    badges.push("Buzzing");
  }

  return (
    <>
      <div className="postCard">
        <div className="badgeContainer">
          {badges.map((badge, index) => (
            <small key={index} className="badge">
              {badge}
            </small>
          ))}
        </div>

        {post.images && post.images[0] && post.images[0].url ? (
          <img src={post.images[0].url} alt={post.name} />
        ) : (
          <h4>No image available</h4>
        )}
        <p>{post.name}</p>
        <span>
          <IoMdPricetags style={{ verticalAlign: "middle" }} /> {post.topic}
        </span>
        <div>
          <span className="postcardSpan">
            {truncate(post?.description, 150)}
          </span>
        </div>
        <h5>
          Posted by{" "}
          <NavLink to={`/users/profile/${post.userID}`}>{post.user}</NavLink>
        </h5>
        <div className="postCardBtn">
          <button className="cmntLink" onClick={commentToggle}>
            Comments ({post.numOfComments})
          </button>
          <NavLink
            className="readLink"
            to={`/community/${post._id}`}
            onClick={handlePostClick} // Track click
          >
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
                  <BiSolidUser className="userIcon" />
                  <strong>{comment.name}:</strong> {comment.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No Comments</p>
          )}
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
