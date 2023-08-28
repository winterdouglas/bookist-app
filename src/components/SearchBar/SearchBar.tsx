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
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

export type SearchBarProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const SearchBar = ({
  placeholder: inputPlaceholder,
  style,
  inputStyle,
  ...props
}: SearchBarProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const placeholder = inputPlaceholder ?? t("search");

  return (
    <View {...props} style={[styles.container, style]}>
      <Icon
        style={{ color: colors.textDim }}
        name="search"
        size={spacing.extraLarge}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        style={[styles.input, inputStyle, { color: colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.small,
  },
  input: {
    padding: spacing.extraSmall,
  },
});
