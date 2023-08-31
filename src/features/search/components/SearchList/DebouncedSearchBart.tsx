import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useDebouncedSearch } from "@/features/search/hooks/useDebouncedSearch";

export type DebouncedSearchBarProps = {
  onSearch?: (searchTerm: string) => void;
};

export const DebouncedSearchBar = ({ onSearch }: DebouncedSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useDebouncedSearch(searchTerm, onSearch);

  return (
    <SearchBar
      selectTextOnFocus
      value={searchTerm}
      onChangeText={setSearchTerm}
    />
  );
};
