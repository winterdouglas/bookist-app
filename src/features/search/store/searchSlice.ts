import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { AppAsyncThunkConfig, RequestStatus, RootState } from "@/store";
import { Api, type SearchResult } from "@/services/api";

type StatusBySearchTerm = Record<string, RequestStatus | undefined>;

type DataBySearchTerm = Record<
  string,
  | {
      page: number;
      allFetched: boolean;
      lastRequestedTime?: Record<number, number>;
      pages: Record<number, SearchResult[]>;
    }
  | undefined
>;

type SearchBooksResult = {
  results: SearchResult[];
  page: number;
};

export const searchBooks = createAsyncThunk<
  SearchBooksResult,
  string,
  AppAsyncThunkConfig
>(
  "books/search",
  async (searchTerm, { getState, signal }) => {
    const state = getState();
    const page = selectPageBySearchTerm(state, searchTerm);
    const data = selectDataBySearchTerm(state, searchTerm);

    const cachedData = data?.pages[page];
    if (cachedData) {
      // Use cached data
      return { results: cachedData, page };
    }

    const result = await Api.searchBooks(searchTerm, page, signal);
    return { results: result.docs, page };
  },
  {
    condition: (searchTerm, { getState }) => {
      const state = getState();
      const status = selectStatusBySearchTerm(state, searchTerm);
      const allFetched = selectAllFetchedBySearchTerm(state, searchTerm);

      return searchTerm.length >= 3 && status !== "pending" && !allFetched;
    },
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    dataBySearchTerm: {} as DataBySearchTerm,
    statusBySearchTerm: {} as StatusBySearchTerm,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchBooks.pending, (state, action) => {
      const searchTerm = action.meta.arg;
      state.statusBySearchTerm[searchTerm] = action.meta.requestStatus;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      const searchTerm = action.meta.arg;
      const { results, page } = action.payload;

      // TODO: Check
      state.dataBySearchTerm[searchTerm] = {
        ...(state.dataBySearchTerm[searchTerm] ?? {}),
        page: results.length > 0 ? page + 1 : page,
        allFetched: results.length === 0,
        lastRequestedTime: {
          ...(state.dataBySearchTerm[searchTerm]?.lastRequestedTime ?? {}),
          [page]: Date.now(),
        },
        pages: {
          ...(state.dataBySearchTerm[searchTerm]?.pages ?? {}),
          [page]: results,
        },
      };
      state.statusBySearchTerm[searchTerm] = action.meta.requestStatus;
    });
    builder.addCase(searchBooks.rejected, (state, action) => {
      const searchTerm = action.meta.arg;
      state.statusBySearchTerm[searchTerm] = action.meta.requestStatus;
    });
  },
});

export const selectPageBySearchTerm = (state: RootState, searchTerm: string) =>
  state.search.dataBySearchTerm[searchTerm]?.page ?? 1;

export const selectAllFetchedBySearchTerm = (
  state: RootState,
  searchTerm: string,
) => state.search.dataBySearchTerm[searchTerm]?.allFetched;

export const selectDataBySearchTerm = (state: RootState, searchTerm: string) =>
  state.search.dataBySearchTerm[searchTerm];

export const selectStatusBySearchTerm = (
  state: RootState,
  searchTerm: string,
) => state.search.statusBySearchTerm[searchTerm];

export const selectAllPagesBySearchTerm = createSelector(
  selectDataBySearchTerm,
  selectPageBySearchTerm,
  (data, page) => {
    if (!data || !data.pages || !page) {
      return [];
    }

    return Object.entries(data.pages)
      .map(([key, value]) => [parseInt(key, 10), value] as const)
      .sort(([k1], [k2]) => k1 - k2)
      .reduce((acc, [currKey, currValue]) => {
        if (currKey <= page) {
          acc = [...acc, ...currValue];
        }
        return acc;
      }, [] as SearchResult[]);
  },
);
