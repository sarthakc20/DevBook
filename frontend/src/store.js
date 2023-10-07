import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allPostReducer,
  commentReducer,
  editPostReducer,
  myPostsReducer,
  newPostReducer,
  postDetailsReducer,
  postReducer,
  userPostsReducer,
} from "./reducers/postReducer";
import {
  allResourceReducer,
  deleteResourcetReducer,
  myResourcesReducer,
  newResourceReducer,
  resourceReducer,
} from "./reducers/resourceReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  posts: postReducer,
  allPosts: allPostReducer,
  resource: resourceReducer,
  allResources: allResourceReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newPost: newPostReducer,
  myPosts: myPostsReducer,
  editPost: editPostReducer,
  postDetails: postDetailsReducer,
  newResource: newResourceReducer,
  myResources: myResourcesReducer,
  deleteResource: deleteResourcetReducer,
  comment: commentReducer,
  userPosts: userPostsReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
