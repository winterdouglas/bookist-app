import { SearchResult } from "./searchResult";

export type SearchResultPage = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SearchResult[];
};
