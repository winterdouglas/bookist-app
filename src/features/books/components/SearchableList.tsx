import { FC, useState } from "react";
import {
  ViewProps,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { DebouncedSearchInput } from "@/components/DebouncedSearchInput";
import { useSearchBooks } from "@/features/books/hooks/useSearchBooks";
import { spacing } from "@/theme";
import { BookCell } from "@/features/books/components/BookCell";
import { SearchResult } from "@/features/books/models";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useAnimatedSearchStyle } from "@/features/books/hooks/useAnimatedSearchStyle";

export type SearchListProps = ViewProps;

export const SearchableList: FC<SearchListProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loadMore, isLoading, isUninitialized } =
    useSearchBooks(searchTerm);
  const navigation = useNavigation();
  const { animatedStyles } = useAnimatedSearchStyle(searchTerm);

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
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={loadMore}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Animated.View style={animatedStyles}>
            <DebouncedSearchInput
              style={styles.input}
              onSearch={setSearchTerm}
            />
          </Animated.View>
        }
        ListFooterComponent={
          isLoading && !isUninitialized ? (
            <LoadingIndicator preset="inline" />
          ) : null
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: spacing.medium,
  },
});
