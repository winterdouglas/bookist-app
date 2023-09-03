import { RootState } from "@/store";
import { withPayloadType } from "@/utils/withPayloadType";
import { createAction, createSlice } from "@reduxjs/toolkit";

export const toggleReadingBook = createAction(
  "readingList/bookToggled",
  withPayloadType<string>(),
);

export const readingListSlice = createSlice({
  name: "readingList",
  initialState: {
    readingBooksByBookId: {} as Record<string, boolean>,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleReadingBook, (state, action) => {
      const bookId = action.payload;
      state.readingBooksByBookId[bookId] = !state.readingBooksByBookId[bookId];
    });
  },
});

export const selectIsReadingBook = (state: RootState, bookId: string) =>
  state.readingList.readingBooksByBookId[bookId] ?? false;
