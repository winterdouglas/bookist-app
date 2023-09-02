import { FC, useState } from "react";
import { View, ViewProps, FlatList } from "react-native";
import { DebouncedSearchInput } from "@/components/DebouncedSearchInput";
import { useSearchBooks } from "@/features/search/hooks/useSearchBooks";
import { spacing } from "@/theme";
import { BookCell } from "@/features/search/components/BookCell";
import { useNavigation } from "@react-navigation/native";

export type SearchListProps = ViewProps;

export const SearchableList: FC<SearchListProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loadMore } = useSearchBooks(searchTerm);
  const navigation = useNavigation();

  const handleItemPress = (id: string) => {
    navigation.navigate("SearchResultDetails", { id, searchTerm: searchTerm });
  };

  return (
    <View {...props}>
      <DebouncedSearchInput
        style={{ margin: spacing.medium }}
        onSearch={setSearchTerm}
      />
      <FlatList
        keyExtractor={(i) => i.key}
        data={data}
        renderItem={({ item }) => (
          <BookCell item={item} onPress={handleItemPress} />
        )}
        onEndReached={loadMore}
      />
    </View>
  );
};
