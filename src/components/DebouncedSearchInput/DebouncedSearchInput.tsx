import { useState, useEffect } from "react";
import { SearchInput, SearchInputProps } from "@/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";

export type DebouncedSearchInputProps = Omit<
  SearchInputProps,
  "value" | "onChangeText"
> & {
  onSearch?: (searchTerm: string) => void;
};

export const DebouncedSearchInput = ({
  onSearch,
  ...props
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
      {...props}
      selectTextOnFocus
      value={searchTerm}
      onChangeText={setSearchTerm}
    />
  );
};
