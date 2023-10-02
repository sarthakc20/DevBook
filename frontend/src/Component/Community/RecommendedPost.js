import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../Home/postCard";
import { NavLink } from "react-router-dom";

const RecommendedPost = () => {
  const { posts } = useSelector((state) => state.posts);

  const { post: thisPost } = useSelector((state) => state.postDetails);

  const recommendedPosts = posts.filter(
    (post) => post.topic === thisPost.topic && post._id !== thisPost._id
  );

  return (
    <>
      {recommendedPosts.length > 0 ? (
        <>
          <div className="preContainer">
            <h2>Recommended Posts For You</h2>
          </div>

          <div className="container" id="container">
            {recommendedPosts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>

          <div className="homeComm">
            <NavLink to="/community">View All Posts</NavLink>
          </div>
        </>
      ) : (
        null
      )}
    </>
  );
};

export default RecommendedPost;
