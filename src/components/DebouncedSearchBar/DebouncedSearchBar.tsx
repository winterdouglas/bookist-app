import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";

export type DebouncedSearchBarProps = {
  onSearch?: (searchTerm: string) => void;
};

export const DebouncedSearchBar = ({ onSearch }: DebouncedSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    onSearch?.(debouncedSearchTerm);

    // Not ideal, but since we don't have useEffectEvent available yet, it's a tradeoff to make it simple
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <SearchBar
      selectTextOnFocus
      value={searchTerm}
      onChangeText={setSearchTerm}
    />
  );
};
