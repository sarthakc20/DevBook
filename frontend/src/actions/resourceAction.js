import axios from "axios";
import { ALL_RESOURCE_FAIL, ALL_RESOURCE_REQUEST, ALL_RESOURCE_SUCCESS, CLEAR_ERRORS } from "../constants/resourceConstant";

// GET ALL POSTS (With Search)
export const getAllResources =
  (keyword = "", currentPage = 1, category ) =>
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

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
