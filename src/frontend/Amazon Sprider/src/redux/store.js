import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./actions/authAction";
import { persistReducer, persistStore } from "redux-persist";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
