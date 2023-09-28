import axios from "axios";
import {
  ALL_POST_FAIL,
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  CLEAR_ERRORS,
  MY_POSTS_FAIL,
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  NEW_POST_FAIL,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
} from "../constants/postConstants";

// GET ALL POSTS (With Search)
export const getAllPost =
  (keyword = "", currentPage = 1, topic) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_POST_REQUEST });

      let link = `/api/v1/community?keyword=${keyword}&page=${currentPage}`;

      if (topic) {
        link = `/api/v1/community?keyword=${keyword}&page=${currentPage}&topic=${topic}`;
      }

      if (topic === "All") {
        link = `/api/v1/community?keyword=${keyword}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Create Post
  export const createPost = (postData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_POST_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/community/new`,
        postData,
        config
      );
  
      dispatch({
        type: NEW_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // My Posts
export const myPosts = () => async (dispatch) => {
  try {
    dispatch({ type: MY_POSTS_REQUEST });

    const { data } = await axios.get("/api/v1/me/community/posts");

    dispatch({ type: MY_POSTS_SUCCESS, payload: data.posts });
  } catch (error) {
    dispatch({
      type: MY_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
