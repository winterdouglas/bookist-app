import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Icon } from "@/components/Icon";
import { spacing } from "@/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";

export type SearchInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const SearchInput = ({
  placeholder: inputPlaceholder,
  style,
  inputStyle,
  ...props
}: SearchInputProps) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const placeholder = inputPlaceholder ?? t("search");

  const $containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    { backgroundColor: colors.border },
    style,
  ];

  return (
    <View style={$containerStyles}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor={colors.textDim}
        {...props}
        placeholder={placeholder}
        style={[styles.input, inputStyle, { color: colors.text }]}
      />
      <Icon
        style={{ color: colors.textDim }}
        name="search"
        size={spacing.extraLarge}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.tiny,
    paddingHorizontal: spacing.extraSmall,
    borderRadius: 100,
  },
  input: {
    padding: spacing.extraSmall,
    flex: 1,
  },
});
