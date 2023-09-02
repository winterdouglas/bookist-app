import { useCallback, useEffect, useState } from "react";
import { ViewProps } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { useAnimatedSearchStyle } from "@/features/search/hooks/useAnimatedSearchStyle";
import { Text } from "@/components/Text";
import { DebouncedSearchBar } from "@/components/DebouncedSearchBar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  searchBooks,
  selectAllPagesBySearchTerm,
} from "@/features/search/store/searchSlice";
import { SearchResult } from "@/features/search/models";
import { useSearchBooks } from "@/features/search/hooks/useSearchBooks";

export type SearchListProps = ViewProps;

export const SearchList = (props: SearchListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { animatedStyles, animateSearch, resetAnimation } =
    useAnimatedSearchStyle();

  const { data, loadMore } = useSearchBooks(searchTerm);

  useEffect(() => {
    if (data.length > 0) {
      animateSearch();
    } else {
      resetAnimation();
    }
  }, [animateSearch, resetAnimation, data.length]);

  return (
    <FlashList
      {...props}
      keyExtractor={(i) => i.key}
      ListHeaderComponent={<DebouncedSearchBar onSearch={setSearchTerm} />}
      estimatedItemSize={40}
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      // contentContainerStyle={[props.style, animatedStyles]}
      onEndReached={loadMore}
    />
  );
};

const Item = ({ item }: { item: SearchResult }) => {
  return (
    <Animated.View
      style={{ height: 40, alignItems: "center" }}
      entering={FadeIn}
      exiting={FadeOut}>
      <Text text={item.title} />
    </Animated.View>
  );
};
