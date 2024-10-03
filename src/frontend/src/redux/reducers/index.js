import { combineReducers } from "@reduxjs/toolkit";

import { userApi } from "../actions/userAction";
import { authApi } from "../actions/authAction";
import { settingApi } from "../actions/SettingAction";
import { storeApi } from "../actions/storeAction";
import { blogApi } from "../actions/blogAction";

import {
  authSlice,
  getPackagesSlice,
  getSettingSlice,
  getStoreIdSlice,
  getBlogSlice,
} from "../slices";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  getPackages: getPackagesSlice.reducer,
  getSetting: getSettingSlice.reducer,
  getStoreId: getStoreIdSlice.reducer,
  getBlogData: getBlogSlice.reducer, // Name must match the one in useSelector
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
});

export { rootReducer };
