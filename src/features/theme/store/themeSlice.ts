import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { AppTheme } from "@/theme";
import { withPayloadType } from "@/utils/withPayloadType";

export const setSelectedTheme = createAction(
  "theme/themeSet",
  withPayloadType<AppTheme>(),
);

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    selectedTheme: "auto" as AppTheme,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedTheme, (state, action) => {
      state.selectedTheme = action.payload;
    });
  },
});

export const selectTheme = (state: RootState) => state.theme.selectedTheme;
