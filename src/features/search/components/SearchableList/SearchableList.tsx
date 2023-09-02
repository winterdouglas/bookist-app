import { FC, useState } from "react";
import { View, ViewProps, FlatList } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAnimatedSearchStyle } from "@/features/search/hooks/useAnimatedSearchStyle";
import { DebouncedSearchInput } from "@/components/DebouncedSearchInput";
import { SearchResult } from "@/features/search/models";
import { useSearchBooks } from "@/features/search/hooks/useSearchBooks";
import { AutoImage } from "@/components/AutoImage";
import { Config } from "@/config";
import { Text } from "@/components/Text";
import { spacing } from "@/theme";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { getColorFromSeed } from "@/utils/getColorFromSeed";
import { unique } from "@/utils/array";

export type SearchListProps = ViewProps;

export const SearchableList = (props: SearchListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const { animatedStyles, animateSearch, resetAnimation } =
  //   useAnimatedSearchStyle();

  const { data, loadMore } = useSearchBooks(searchTerm);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     animateSearch();
  //   } else {
  //     resetAnimation();
  //   }
  // }, [animateSearch, resetAnimation, data.length]);

  return (
    <>
      <DebouncedSearchInput
        style={{ margin: spacing.medium }}
        onSearch={setSearchTerm}
      />
      <FlatList
        {...props}
        keyExtractor={(i) => i.key}
        data={data}
        renderItem={({ item }) => <BookCell item={item} />}
        onEndReached={loadMore}
      />
    </>
  );
};

const BookCell = ({ item }: { item: SearchResult }) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        flexDirection: "row",
        height: 180,
        padding: spacing.medium,
        columnGap: spacing.medium,
      }}>
      <View
        style={{
          width: 100,
          height: 160,
          alignItems: "center",
        }}>
        {!!item.cover_i && (
          <View
            style={{
              borderRadius: spacing.medium,
              shadowColor: colors.shadow,
              shadowOffset: { width: 8, height: 8 },
              shadowRadius: spacing.medium,
              shadowOpacity: 0.5,
            }}>
            <AutoImage
              style={{ overflow: "hidden", borderRadius: spacing.medium }}
              maxWidth={100}
              maxHeight={160}
              source={{
                uri: `${Config.COVERS_URL}/b/id/${item.cover_i}-M.jpg`,
                priority: "normal",
              }}
            />
          </View>
        )}
      </View>
      <View style={{ gap: spacing.tiny, flex: 1 }}>
        <Text text={item.title} preset="heading" numberOfLines={2} />
        <BookAuthors authors={item.author_name} />
        <BookFirstPublishedIn year={item.first_publish_year} />
        <BookLanguages languages={item.language} />
      </View>
    </Animated.View>
  );
};

const BookAuthors: FC<{ authors?: string[] }> = ({ authors = [] }) => {
  const uniqueAuthors = unique(authors);
  return (
    !!authors.length && (
      <>
        {uniqueAuthors.map((author) => (
          <Text
            key={author}
            text={author}
            preset="list"
            numberOfLines={3}
            style={{ flexWrap: "wrap" }}
          />
        ))}
      </>
    )
  );
};

const BookFirstPublishedIn: FC<{ year?: number }> = ({ year = 0 }) => {
  const { t } = useTranslation(["search"]);
  const { colors } = useTheme();

  return (
    !!year && (
      <Text
        preset="subtitle"
        text={t("search:firstPublishedIn", { year: year })}
        style={{ color: colors.textDim }}
      />
    )
  );
};

const BookLanguages: FC<{ languages?: string[]; limit?: number }> = ({
  languages = [],
  limit = 5,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const displayedLanguages =
    languages && languages.length > limit
      ? languages.slice(0, limit)
      : languages;
  const remainingLanguages =
    languages && languages.length > displayedLanguages.length
      ? t("andCountMore", {
          count: languages.length - displayedLanguages.length,
        })
      : "";

  return (
    !!displayedLanguages.length && (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
        {displayedLanguages.map((language) => (
          <View
            key={language}
            style={{
              margin: spacing.micro,
              padding: spacing.tiny,
              borderRadius: spacing.extraSmall,
              backgroundColor: getColorFromSeed(language),
            }}>
            <Text
              preset="subtitle"
              text={language}
              style={{ color: colors.textDim }}
            />
          </View>
        ))}
        {!!remainingLanguages && (
          <Text
            style={{
              marginLeft: spacing.tiny,
              color: colors.textDim,
            }}
            preset="subtitle"
            text={remainingLanguages}
          />
        )}
      </View>
    )
  );
};
