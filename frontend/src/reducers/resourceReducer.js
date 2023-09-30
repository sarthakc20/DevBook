import {
  ALL_RESOURCE_FAIL,
  ALL_RESOURCE_REQUEST,
  ALL_RESOURCE_SUCCESS,
  CLEAR_ERRORS,
  MY_RESOURCES_FAIL,
  MY_RESOURCES_REQUEST,
  MY_RESOURCES_SUCCESS,
  NEW_RESOURCE_FAIL,
  NEW_RESOURCE_REQUEST,
  NEW_RESOURCE_RESET,
  NEW_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAIL,
  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_RESET,
  UPDATE_RESOURCE_SUCCESS,
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

// Create new resource
export const newResourceReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case NEW_RESOURCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_RESOURCE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        post: action.payload.post,
      };
    case NEW_RESOURCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_RESOURCE_RESET:
      return {
        ...state,
        success: false,
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

export const myResourcesReducer = (state = { resources: [] }, action) => {
  switch (action.type) {
    case MY_RESOURCES_REQUEST:
      return {
        loading: true,
      };

    case MY_RESOURCES_SUCCESS:
      return {
        loading: false,
        resources: action.payload,
      };

    case MY_RESOURCES_FAIL:
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

export const updateResourcetReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case UPDATE_RESOURCE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_RESOURCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_RESOURCE_RESET:
      return {
        ...state,
        isUpdated: false,
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