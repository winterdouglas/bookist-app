import { ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookCoverImage } from "@/features/books/components/BookCoverImage";
import { useBackButton } from "@/hooks/useBackButton";
import { AppStackParamList } from "@/navigation";
import { BookTitle } from "@/features/books/components/BookTitle";
import { BookAuthors } from "@/features/books/components/BookAuthors";
import { BookFirstPublishedIn } from "@/features/books/components/BookFirstPublication";
import { BookLanguages } from "@/features/books/components/BookLanguages";
import { spacing } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookLists } from "@/features/books/components/BookLists";
import { useLookupSearchResult } from "@/features/books/hooks/useLookupSearchResult";

export const SearchResultDetailsScreen = ({
  route,
}: NativeStackScreenProps<AppStackParamList, "SearchResultDetails">) => {
  const { id, searchTerm } = route.params;
  const insets = useSafeAreaInsets();

  // Ideally this should be in a Screen component, for now it will do
  useBackButton();

  const searchResult = useLookupSearchResult(searchTerm, id);

  return searchResult ? (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.medium }]}>
      <BookCoverImage
        bookId={searchResult.key}
        coverId={searchResult.cover_i}
        preset="detail"
        style={styles.cover}
      />
      <View style={styles.infoContainer}>
        <BookTitle preset="detail" title={searchResult.title} />
        <BookAuthors authors={searchResult.author_name} />
        <BookFirstPublishedIn year={searchResult.first_publish_year} />
        <BookLanguages languages={searchResult.language} />
        <BookLists bookId={searchResult.key} />
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
