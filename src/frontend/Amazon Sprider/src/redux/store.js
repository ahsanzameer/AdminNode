import { rootReducer } from "./reducers";
import { userApi } from "./actions/userAction";
import { authApi } from "./actions/authAction";
import zakhira from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: zakhira,
  whitelist: ["auth", "getPackages", authApi.reducerPath, userApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  storage: zakhira,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };
