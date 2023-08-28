import { api } from "@/services/api";

export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchBooks: builder.query<any, { q: string; page: number }>({
      query: (searchParams) => ({
        url: "search.json",
        params: searchParams,
      }),
    }),
  }),
});

export const { useSearchBooksQuery } = searchApi;
