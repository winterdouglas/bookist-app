import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  // TODO
});

export const setupStore = () => {
  return configureStore({
    reducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      // TODO
      getDefaultMiddleware().concat(),
  });
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
