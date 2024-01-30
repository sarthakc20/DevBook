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
import {
  clearErrors,
  getAllPost,
  getPostDetails,
  newComment,
} from "../../actions/postAction";
import "./CommunityPostDetails.css";
import { MdEdit } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { NEW_COMMENT_RESET } from "../../constants/postConstants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import RecommendedPost from "./RecommendedPost";
import profilelogo from "../../images/user.png";

const CommunityPostDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { post, loading, error } = useSelector((state) => state.postDetails);

  const { success, error: commentError } = useSelector(
    (state) => state.comment
  );

  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const commentToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitCommentHandler = () => {
    const myForm = new FormData();

    myForm.set("comment", comment);
    myForm.set("postId", id);

    dispatch(newComment(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (commentError) {
      alert.error(commentError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Comment Added Successfully");
      dispatch({ type: NEW_COMMENT_RESET });
    }

    dispatch(getPostDetails(id));

    dispatch(getAllPost());

    window.scrollTo(0, 0);
  }, [dispatch, id, error, alert, commentError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${post.name}`} />

          {user && post.userID === user._id ? (
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
                <h3>
                  <div>
                  { post.userAvatar ? (
                    <img src={post.userAvatar.url} alt={post.user} />
                  ) : (
                    <img src={profilelogo} alt={post.user} />
                  )}
                  </div>
                  <NavLink to={`/users/profile/${post.userID}`}>{post.user}</NavLink>
                  <br />
                  <p>Posted on {String(post.createdAt).substring(0, 10)}</p>
                </h3>
                <span>Topic :{post.topic}</span>
              </div>

              <div className="detailsBlock-2">
                <span>Description</span> :{" "}
                <div className="detailsBlock-2-1">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={darcula}
                            language={match[1]}
                            PreTag="div"
                            children={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {post.description}
                  </ReactMarkdown>
                </div>
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
                    <BiSolidUser className="userIcon" />
                    <strong>{comment.name}:</strong> {comment.comment}
                  </p>
                </div>
              ))
            ) : (
              <p>No Comments</p>
            )}
          </div>

          <RecommendedPost />

          <Dialog
            aria-labelledby="Simple-dialog-title"
            open={open}
            maxWidth="xl"
            onClose={commentToggle}
            className="dialog"
          >
            <DialogTitle>Comments - {post.name}</DialogTitle>
            <DialogContent className="submitDialogActions">
              <textarea
                className="submitDialogTextArea"
                cols="50"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitCommentHandler} color="primary">
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
