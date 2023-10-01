import axios from "axios";
import {
  ALL_RESOURCE_FAIL,
  ALL_RESOURCE_REQUEST,
  ALL_RESOURCE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_RESOURCE_FAIL,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  MY_RESOURCES_FAIL,
  MY_RESOURCES_REQUEST,
  MY_RESOURCES_SUCCESS,
  NEW_RESOURCE_FAIL,
  NEW_RESOURCE_REQUEST,
  NEW_RESOURCE_SUCCESS,
} from "../constants/resourceConstant";

// GET ALL POSTS (With Search)
export const getAllResources =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RESOURCE_REQUEST });

      let link = `/api/v1/resources?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/resources?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      if (category === "All") {
        link = `/api/v1/resources?keyword=${keyword}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_RESOURCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_RESOURCE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Create Resource
export const createResource = (resData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_RESOURCE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/resource/new`, resData, config);

    dispatch({
      type: NEW_RESOURCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_RESOURCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Resources
export const myResources = () => async (dispatch) => {
  try {
    dispatch({ type: MY_RESOURCES_REQUEST });

    const { data } = await axios.get("/api/v1/me/resources");

    dispatch({ type: MY_RESOURCES_SUCCESS, payload: data.resources });
  } catch (error) {
    dispatch({
      type: MY_RESOURCES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Resource
export const deleteResource = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RESOURCE_REQUEST });

    const { data } = await axios.delete(`/api/v1/me/resource/${id}`);

    dispatch({
      type: DELETE_RESOURCE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESOURCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
