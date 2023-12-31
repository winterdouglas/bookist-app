import { ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookCoverImage } from "@/features/books/components/BookCoverImage";
import { useBackButton } from "@/hooks/useBackButton";
import { AppStackParamList } from "@/navigation";
import { BookTitle } from "@/features/books/components/BookTitle";
import { BookAuthors } from "@/features/books/components/BookAuthors";
import { BookFirstPublishedIn } from "@/features/books/components/BookFirstPublication";
import { BookLanguages } from "@/features/books/components/BookLanguages";
import {
  selectSearchResult,
  selectSearchResultPage,
} from "@/features/books/store/searchSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { spacing } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookLists } from "@/features/books/components/BookLists";

export const SearchResultDetailsScreen = ({
  route,
}: NativeStackScreenProps<AppStackParamList, "SearchResultDetails">) => {
  const { id, searchTerm } = route.params;
  const insets = useSafeAreaInsets();

  // Ideally this should be in a Screen component, for now it will do
  useBackButton();

  const itemPage = useAppSelector((state) =>
    selectSearchResultPage(state, searchTerm, id),
  );

  const item = useAppSelector((state) =>
    selectSearchResult(state, searchTerm, itemPage ?? 0, id),
  );

  return item ? (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.medium }]}>
      <BookCoverImage
        bookId={item.key}
        coverId={item.cover_i}
        preset="detail"
        style={styles.cover}
      />
      <View style={styles.infoContainer}>
        <BookTitle preset="detail" title={item.title} />
        <BookAuthors authors={item.author_name} />
        <BookFirstPublishedIn year={item.first_publish_year} />
        <BookLanguages languages={item.language} />
        <BookLists bookId={item.key} />
      </View>
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.medium,
  },
  cover: {
    alignSelf: "center",
  },
  infoContainer: {
    paddingTop: spacing.huge,
    gap: spacing.tiny,
  },
});
