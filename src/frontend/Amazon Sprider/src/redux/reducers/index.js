import { authSlice } from "../slices";
import { userApi } from "../actions/userAction";
import { authApi } from "../actions/authAction";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export { rootReducer };
