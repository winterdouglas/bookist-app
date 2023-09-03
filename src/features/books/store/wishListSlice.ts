import { RootState } from "@/store";
import { withPayloadType } from "@/utils/withPayloadType";
import { createAction, createSlice } from "@reduxjs/toolkit";

export const toggleWishedBook = createAction(
  "wishList/bookToggled",
  withPayloadType<string>(),
);

export const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishedBooksByBookId: {} as Record<string, boolean>,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleWishedBook, (state, action) => {
      const bookId = action.payload;
      state.wishedBooksByBookId[bookId] = !state.wishedBooksByBookId[bookId];
    });
  },
});

export const selectIsWishedBook = (state: RootState, bookId: string) =>
  state.wishList.wishedBooksByBookId[bookId] ?? false;
