import { useCallback, useEffect, useState } from "react";
import { ViewProps } from "react-native";
import { useAnimatedSearchStyle } from "@/features/search/hooks/useAnimatedSearchStyle";
import { Text } from "@/components/Text";
import { DebouncedSearchBar } from "./DebouncedSearchBart";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  searchBooks,
  selectAllPagesBySearchTerm,
} from "../../store/searchSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import Animated from "react-native-reanimated";

export type SearchListProps = ViewProps;

export const SearchList = (props: SearchListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { animatedStyles, animateSearch, resetAnimation } =
    useAnimatedSearchStyle();

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) =>
    selectAllPagesBySearchTerm(state, searchTerm),
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);

      dispatch(searchBooks(term));
    },
    [dispatch],
  );

  const handleLoadMore = () => {
    dispatch(searchBooks(searchTerm));
  };

  useEffect(() => {
    if (data.length > 0) {
      animateSearch();
    } else {
      resetAnimation();
    }
  }, [animateSearch, resetAnimation, data.length]);

  return (
    <Animated.FlatList
      {...props}
      keyExtractor={(i) => i.key}
      ListHeaderComponent={<DebouncedSearchBar onSearch={handleSearch} />}
      data={data}
      renderItem={({ item }) => <Text text={item.title} />}
      style={[props.style, animatedStyles]}
      onEndReached={handleLoadMore}
    />
  );
};
