import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchApi } from "@/features/search/services/searchApi";

const reducer = combineReducers({
  [searchApi.reducerPath]: searchApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchApi.middleware),
  });
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
