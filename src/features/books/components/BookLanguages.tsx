import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/features/theme/hooks/useAppTheme";
import { spacing } from "@/theme";
import { getColorFromSeed } from "@/utils/getColorFromSeed";
import { Text } from "@/components/Text";

export const BookLanguages: FC<{ languages?: string[]; limit?: number }> = ({
  languages = [],
  limit = 5,
}) => {
  const { colors, dark } = useAppTheme();
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

  return displayedLanguages.length ? (
    <View style={styles.container}>
      {displayedLanguages.map((language) => (
        <View
          key={language}
          style={[
            styles.languageContainer,
            {
              backgroundColor: getColorFromSeed(language),
            },
          ]}>
          <Text
            preset="subtitle"
            text={language}
            style={{ color: dark ? colors.background : colors.textDim }}
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
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  languageContainer: {
    margin: spacing.micro,
    padding: spacing.tiny,
    borderRadius: spacing.extraSmall,
  },
});
