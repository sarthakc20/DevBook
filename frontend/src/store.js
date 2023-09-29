import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { editPostReducer, myPostsReducer, newPostReducer, postDetailsReducer, postReducer } from "./reducers/postReducer";
import { resourceReducer } from "./reducers/resourceReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  posts: postReducer,
  resource: resourceReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newPost: newPostReducer,
  myPosts: myPostsReducer,
  editPost: editPostReducer,
  postDetails: postDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;