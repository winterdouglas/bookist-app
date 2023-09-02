import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { Text } from "@/components/Text";

export const BookFirstPublishedIn: FC<{ year?: number }> = ({ year = 0 }) => {
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
