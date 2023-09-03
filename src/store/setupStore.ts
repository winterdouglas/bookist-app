import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "@/features/search/store/searchSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { Storage } from "@/lib/storage";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage: Storage,
  whitelist: ["favorites"],
};

const reducer = combineReducers({
  search: searchSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["store"]["dispatch"];

export type AppAsyncThunkConfig<TExtra = unknown, TRejectedValue = unknown> = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: TExtra;
  rejectValue?: TRejectedValue;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export type RequestStatus = "pending" | "fulfilled" | "rejected";
