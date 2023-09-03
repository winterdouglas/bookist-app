import { Icon } from "@/components/Icon";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

export const BackButton = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={[styles.container, { backgroundColor: colors.text }]}>
      <Icon
        size={spacing.extraLarge}
        name="chevron-back"
        style={[styles.icon, { color: colors.background }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.huge / 2,
    width: spacing.huge,
    height: spacing.huge,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: spacing.tiny,
  },
});
