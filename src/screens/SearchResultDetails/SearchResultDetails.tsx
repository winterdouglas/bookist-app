import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookCoverImage } from "@/features/search/components/BookCoverImage";
import { useBackButton } from "@/hooks/useBackButton";
import { AppStackParamList } from "@/navigation";
import { BookTitle } from "@/features/search/components/BookTitle";
import { BookAuthors } from "@/features/search/components/BookAuthors";
import { BookFirstPublishedIn } from "@/features/search/components/BookFirstPublication";
import { BookLanguages } from "@/features/search/components/BookLanguages";
import {
  selectSearchResult,
  selectSearchResultPage,
} from "@/features/search/store/searchSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { spacing } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  if (!item) {
    return null;
  }

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <BookCoverImage
        preset="detail"
        coverId={item.cover_i}
        style={styles.cover}
      />
      <View>
        <BookTitle preset="detail" title={item.title} />
        <BookAuthors authors={item.author_name} />
        <BookFirstPublishedIn year={item.first_publish_year} />
        <BookLanguages languages={item.language} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.large,
    paddingHorizontal: spacing.medium,
  },
  cover: { alignSelf: "center" },
});
