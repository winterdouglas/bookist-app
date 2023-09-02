import { FC, useState } from "react";
import { View, ViewProps, FlatList } from "react-native";
import { DebouncedSearchInput } from "@/components/DebouncedSearchInput";
import { useSearchBooks } from "@/features/search/hooks/useSearchBooks";
import { spacing } from "@/theme";
import { BookCell } from "@/features/search/components/BookCell";

export type SearchListProps = ViewProps;

export const SearchableList: FC<SearchListProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loadMore } = useSearchBooks(searchTerm);

  return (
    <View {...props}>
      <DebouncedSearchInput
        style={{ margin: spacing.medium }}
        onSearch={setSearchTerm}
      />
      <FlatList
        keyExtractor={(i) => i.key}
        data={data}
        renderItem={({ item }) => <BookCell item={item} />}
        onEndReached={loadMore}
      />
    </View>
  );
};
