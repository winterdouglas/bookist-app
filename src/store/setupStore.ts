import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "@/features/books/store/searchSlice";
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
import { wishListSlice } from "@/features/books/store/wishListSlice";
import { readingListSlice } from "@/features/books/store/readingListSlice";

const reducer = combineReducers({
  search: searchSlice.reducer,
  wishList: wishListSlice.reducer,
  readingList: readingListSlice.reducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage: Storage,
  whitelist: ["wishList", "readingList"],
};

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
export type AppStore = ReturnType<typeof setupStore>["store"];
export type AppDispatch = AppStore["dispatch"];

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
