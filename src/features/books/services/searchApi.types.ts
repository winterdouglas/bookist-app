// REMARK: Not mapping all the API properties for convenience

export type SearchApiResult = {
  key: string;
  type: string;
  title: string;
  edition_count: string;
  first_publish_year?: number;
  cover_edition_key?: string;
  cover_i?: number;
  language?: string[];
  author_name?: string[];
};

export type SearchApiResultPage = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SearchApiResult[];
};
