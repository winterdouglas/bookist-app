import { FC, useState } from "react";
import {
  ViewProps,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { DebouncedSearchInput } from "@/components/DebouncedSearchInput";
import { useSearchBooks } from "@/features/books/hooks/useSearchBooks";
import { spacing } from "@/theme";
import { BookCell } from "@/features/books/components/BookCell";
import { useNavigation } from "@react-navigation/native";
import { SearchResult } from "@/features/books/models";

export type SearchListProps = ViewProps;

export const SearchableList: FC<SearchListProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loadMore } = useSearchBooks(searchTerm);
  const navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<SearchResult>) => {
    return (
      <BookCell
        item={item}
        onPress={() =>
          navigation.navigate("SearchResultDetails", {
            id: item.key,
            searchTerm: searchTerm,
          })
        }
      />
    );
  };

  return (
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <DebouncedSearchInput style={styles.input} onSearch={setSearchTerm} />
      <FlatList data={data} renderItem={renderItem} onEndReached={loadMore} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: spacing.medium,
  },
});
