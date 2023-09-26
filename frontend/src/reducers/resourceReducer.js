import {
  ALL_RESOURCE_FAIL,
  ALL_RESOURCE_REQUEST,
  ALL_RESOURCE_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/resourceConstant";

export const resourceReducer = (state = { resources: [] }, action) => {
  switch (action.type) {
    case ALL_RESOURCE_REQUEST:
      return {
        loading: true,
        resources: [],
      };
    case ALL_RESOURCE_SUCCESS:
      return {
        loading: false,
        resources: action.payload.resources,
        resourcesCount: action.payload.resourcesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredresourcesCount: action.payload.filteredresourcesCount,
      };

    case ALL_RESOURCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
