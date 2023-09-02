import { useState, useEffect } from "react";
import { SearchInput } from "@/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";

export type DebouncedSearchInputProps = {
  onSearch?: (searchTerm: string) => void;
};

export const DebouncedSearchInput = ({
  onSearch,
}: DebouncedSearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    onSearch?.(debouncedSearchTerm);

    // Not ideal, but since we don't have useEffectEvent available yet, it's a tradeoff to make it simple
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <SearchInput
      selectTextOnFocus
      value={searchTerm}
      onChangeText={setSearchTerm}
    />
  );
};
