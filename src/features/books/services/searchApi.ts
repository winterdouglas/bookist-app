import { Api } from "@/services/api";
import { SearchResultPage } from "@/features/books/models";
import { SearchApiResultPage } from "./searchApi.types";

export const toSearchResultPage = (
  result: SearchApiResultPage,
): SearchResultPage => ({
  ...result,
  docs: result.docs.map((doc) => ({
    key: doc.key,
    type: doc.type,
    title: doc.title,
    language: doc.language,
    author_name: doc.author_name,
    first_publish_year: doc.first_publish_year,
    edition_count: doc.edition_count,
    cover_edition_key: doc.cover_edition_key,
    cover_i: doc.cover_i,
  })),
});

export const createApi = () => {
  const searchBooks = async (
    searchTerm: string,
    page: number,
    cancelSignal?: AbortSignal,
  ) => {
    try {
      const response = await Api.get<SearchApiResultPage>("/search.json", {
        params: {
          q: searchTerm,
          page: page,
        },
        signal: cancelSignal,
      });
      return toSearchResultPage(response);
    } catch (error) {
      if (__DEV__) {
        console.log("Search error", error);
      }

      throw error;
    }
  };

  return { searchBooks };
};

export const SearchApi = createApi();
