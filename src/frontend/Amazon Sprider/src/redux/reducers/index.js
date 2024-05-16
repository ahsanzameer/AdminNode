import { authSlice, getPackagesSlice } from "../slices";
import { userApi } from "../actions/userAction";
import { authApi } from "../actions/authAction";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  getPackages: getPackagesSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export { rootReducer };
