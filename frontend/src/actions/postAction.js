import axios from "axios";
import {
  ALL_POST_FAIL,
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  CLEAR_ERRORS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  MY_POSTS_FAIL,
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_POST_FAIL,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NO_FILTER_ALL_POST_FAIL,
  NO_FILTER_ALL_POST_REQUEST,
  NO_FILTER_ALL_POST_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  TRACK_POST_CLICK_FAIL,
  TRACK_POST_CLICK_REQUEST,
  TRACK_POST_CLICK_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  USER_POSTS_FAIL,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
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

// GET ALL POSTS (Without Filter)
export const getAllPostsWithoutFilter = () => async (dispatch) => {
  try {
    dispatch({ type: NO_FILTER_ALL_POST_REQUEST });

    const { data } = await axios.get("api/v1/community/nofilter");

    dispatch({
      type: NO_FILTER_ALL_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NO_FILTER_ALL_POST_FAIL,
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

// User Posts
export const userAllPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_POSTS_REQUEST });

    const { data } = await axios.get(`/api/v1/community/user/${id}`);

    dispatch({ type: USER_POSTS_SUCCESS, payload: data.userPosts });
  } catch (error) {
    dispatch({
      type: USER_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Post
export const updatePost = (id, postData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/me/community/${id}`,
      postData,
      config
    );

    dispatch({ type: UPDATE_POST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const { data } = await axios.delete(`/api/v1/me/community/${id}`);

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Post Details
export const getPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/community/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Comment
export const newComment = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COMMENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/comment`, commentData, config);

    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Track Post Click
export const trackPostClick = (postId) => async (dispatch) => {
  try {
    dispatch({ type: TRACK_POST_CLICK_REQUEST });

    const { data } = await axios.put(`/api/v1/post/click/${postId}`);

    dispatch({
      type: TRACK_POST_CLICK_SUCCESS,
      payload: data.clicks, // Returning updated click count
    });
  } catch (error) {
    dispatch({
      type: TRACK_POST_CLICK_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
