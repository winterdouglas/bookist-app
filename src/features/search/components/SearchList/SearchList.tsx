import { useCallback, useEffect, useState } from "react";
import { FlatListProps } from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedSearchStyle } from "@/features/search/hooks/useAnimatedSearchStyle";
import { useLazySearchBooksQuery } from "@/features/search/services/searchApi";
import { Text } from "@/components/Text";
import { DebouncedSearchBar } from "./DebouncedSearchBart";

export type SearchListProps<T> = Omit<
  FlatListProps<T>,
  "renderItem" | "data"
> & {};

const useLoadMore = (initialPage: number = 1) => {
  const [page, setPage] = useState<number>(initialPage);

  const loadMore = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
  }, []);

  const resetPage = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return [page, loadMore, resetPage] as const;
};

export const SearchList = <T,>({ ...props }: SearchListProps<T>) => {
  const [page, loadMore, resetPage] = useLoadMore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query, result] = useLazySearchBooksQuery();
  const { animatedStyles, animateSearch, resetAnimation } =
    useAnimatedSearchStyle();

  const handleSearch = useCallback(
    (term: string) => {
      resetPage();
      setSearchTerm(term);
    },
    [resetPage],
  );

  const handleLoadMore = () => {
    if (result.isFetching) {
      return;
    }

    return loadMore();
  };

  useEffect(() => {
    if (searchTerm.length < 3) {
      return;
    }

    console.log(searchTerm, page);
    query({ q: searchTerm, page: page });
  }, [searchTerm, page, query]);

  useEffect(() => {
    if (result.data?.docs?.length > 0) {
      animateSearch();
    } else {
      resetAnimation();
    }
  }, [animateSearch, resetAnimation, result.data]);

  return (
    <Animated.FlatList
      {...props}
      keyExtractor={(i) => i.key}
      ListHeaderComponent={<DebouncedSearchBar onSearch={handleSearch} />}
      data={result.data?.docs ?? []}
      renderItem={({ item }) => <Text text={item.title} />}
      style={[props.style, animatedStyles]}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
    />
  );
};
