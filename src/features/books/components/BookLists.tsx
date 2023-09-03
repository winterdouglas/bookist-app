import { FC } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { ToggleButton } from "@/components/ToggleButton";
import { spacing } from "@/theme";
import { useReadingList } from "@/features/books/hooks/useReadingList";
import { useWishList } from "@/features/books/hooks/useWishList";

export type BookListsProps = ViewProps & {
  bookId: string;
};

export const BookLists: FC<BookListsProps> = ({ bookId, ...props }) => {
  const { isReadingBook, toggleReading } = useReadingList(bookId);
  const { isWishedBook, toggleWished } = useWishList(bookId);

  return (
    <View {...props} style={[styles.container, props.style]}>
      <ToggleButton
        icon="star-outline"
        toggled={isWishedBook}
        onToggleChanged={toggleWished}
      />
      <ToggleButton
        icon="book-outline"
        toggled={isReadingBook}
        onToggleChanged={toggleReading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.extraSmall,
    flexDirection: "row",
    paddingTop: spacing.extraSmall,
  },
});
