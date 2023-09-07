import {
  selectSearchResult,
  selectSearchResultPage,
} from "@/features/books/store/searchSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

export const useLookupSearchResult = (searchTerm: string, bookId: string) => {
  const itemPage = useAppSelector((state) =>
    selectSearchResultPage(state, searchTerm, bookId),
  );

  const item = useAppSelector((state) =>
    selectSearchResult(state, searchTerm, itemPage ?? 0, bookId),
  );

  return item;
};
