import { StyleProp, Text, View, ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";

// TODO: Use the proper Text component
// import { Text } from "@/components/Text";

export const LoadingIndicator = () => {
  const { t } = useTranslation();

  return (
    <View style={$containerStyle}>
      <Text>{t("loading")}</Text>
    </View>
  );
};

const $containerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
