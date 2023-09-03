import {
  ActivityIndicator,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/Text";
import { FC } from "react";
import { spacing } from "@/theme";

export type LoadingIndicatorProps = ViewProps & {
  preset?: keyof typeof $containerPresets;
};

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  preset = "inline",
  style,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <View {...props} style={[$containerPresets[preset], style]}>
      <ActivityIndicator size="small" />
      <Text text={t("loading")} />
    </View>
  );
};

const $baseStyle: StyleProp<ViewStyle> = {
  flexDirection: "row",
  gap: spacing.extraSmall,
};

const $containerPresets = {
  inline: {
    ...$baseStyle,
    alignSelf: "center",
  } as StyleProp<ViewStyle>,

  full: {
    ...$baseStyle,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } as StyleProp<ViewStyle>,
};
