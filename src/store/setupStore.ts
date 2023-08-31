import {
  combineReducers,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { searchSlice } from "@/features/search/store/searchSlice";

const reducer = combineReducers({
  search: searchSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
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
