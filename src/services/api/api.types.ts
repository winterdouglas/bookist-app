export type ApiConfig = {
  url?: string;
};

export type SearchResult = {
  key: string;
  type: string;
  title: string;
  edition_count: string;
  first_publish_year?: number;
  cover_edition_key?: string;
  cover_i?: number;
  language?: string[];
  author_name?: string;
};

export type SearchResultPage = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SearchResult[];
};
