import { FC } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { BookCoverImage } from "@/features/books/components/BookCoverImage";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/theme";
import { SearchResult } from "@/features/books/models";
import { BookLanguages } from "@/features/books/components/BookLanguages";
import { BookFirstPublishedIn } from "@/features/books/components/BookFirstPublication";
import { BookAuthors } from "@/features/books/components/BookAuthors";
import { BookTitle } from "@/features/books/components/BookTitle";
import { BookLists } from "@/features/books/components/BookLists";

export const BookCell: FC<{
  item: SearchResult;
  onPress?: (id: string) => void;
}> = ({ item, onPress }) => {
  const { colors } = useAppTheme();

  return (
    <TouchableHighlight
      underlayColor={colors.border}
      onPress={() => onPress?.(item.key)}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.container}>
        <View style={styles.wrapper}>
          <View
            style={[
              styles.coverShadowedContainer,
              {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
              },
            ]}>
            <BookCoverImage bookId={item.key} coverId={item.cover_i} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <BookTitle title={item.title} />
          <BookAuthors authors={item.author_name} />
          <BookFirstPublishedIn year={item.first_publish_year} />
          <BookLanguages languages={item.language} />
          <BookLists bookId={item.key} />
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 180,
    padding: spacing.medium,
    columnGap: spacing.medium,
  },
  wrapper: {
    width: 100,
    height: 160,
    alignItems: "center",
  },
  coverShadowedContainer: {
    borderRadius: spacing.medium,
    shadowRadius: spacing.medium,
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.4,
  },
  infoContainer: {
    gap: spacing.tiny,
    flex: 1,
  },
});
