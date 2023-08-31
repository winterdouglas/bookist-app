import { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const useDebouncedSearch = (
  searchTerm: string,
  onSearch?: (term: string) => void,
) => {
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (!onSearch) {
      return;
    }

    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
};
