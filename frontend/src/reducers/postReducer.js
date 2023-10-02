import {
  ALL_POST_FAIL,
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  CLEAR_ERRORS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_RESET,
  DELETE_POST_SUCCESS,
  MY_POSTS_FAIL,
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_RESET,
  NEW_COMMENT_SUCCESS,
  NEW_POST_FAIL,
  NEW_POST_REQUEST,
  NEW_POST_RESET,
  NEW_POST_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_RESET,
  UPDATE_POST_SUCCESS,
} from "../constants/postConstants";

export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case ALL_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredPostsCount: action.payload.filteredPostsCount,
      };
    case ALL_POST_FAIL:
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

// Create new post
export const newPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case NEW_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_POST_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        post: action.payload.post,
      };
    case NEW_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_POST_RESET:
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

export const myPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MY_POSTS_REQUEST:
      return {
        loading: true,
      };

    case MY_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };

    case MY_POSTS_FAIL:
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

export const editPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_POST_FAIL:
    case UPDATE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_POST_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_POST_RESET:
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

export const postDetailsReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        loading: true,
        ...state, //to access the curent state
      };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case POST_DETAILS_FAIL:
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

export const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_COMMENT_RESET:
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
