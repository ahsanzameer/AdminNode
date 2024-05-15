import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../actions/authAction";
import { authSlice } from "../slices";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export { rootReducer };
