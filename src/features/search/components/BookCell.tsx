import { StyleSheet, TouchableHighlight, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { BookCoverImage } from "@/features/search/components/BookCoverImage";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/theme";
import { SearchResult } from "@/features/search/models";
import { BookLanguages } from "@/features/search/components/BookLanguages";
import { BookFirstPublishedIn } from "@/features/search/components/BookFirstPublication";
import { BookAuthors } from "@/features/search/components/BookAuthors";
import { BookTitle } from "@/features/search/components/BookTitle";

export const BookCell = ({ item }: { item: SearchResult }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={colors.border}
      onPress={() =>
        navigation.navigate("SearchResultDetails", { coverId: item.cover_i })
      }>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.container}>
        <View style={styles.wrapper}>
          {!!item.cover_i && (
            <View
              style={[
                styles.coverShadowedContainer,
                {
                  backgroundColor: colors.background,
                  shadowColor: colors.shadow,
                },
              ]}>
              <BookCoverImage style={styles.cover} coverId={item.cover_i} />
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <BookTitle title={item.title} />
          <BookAuthors authors={item.author_name} />
          <BookFirstPublishedIn year={item.first_publish_year} />
          <BookLanguages languages={item.language} />
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
  cover: {
    overflow: "hidden",
    borderRadius: spacing.medium,
  },
  infoContainer: {
    gap: spacing.tiny,
    flex: 1,
  },
});
