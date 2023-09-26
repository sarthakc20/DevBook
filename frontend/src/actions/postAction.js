import axios from "axios";
import {
  ALL_POST_FAIL,
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/postConstants";

// GET ALL POSTS (With Search)
export const getAllPost =
  (keyword = "", currentPage = 1, topic ) =>
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

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
