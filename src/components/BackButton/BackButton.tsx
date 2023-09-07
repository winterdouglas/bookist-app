import { IconButton } from "@/components/IconButton";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <IconButton
      preset="round"
      icon="chevron-back"
      onPress={navigation.goBack}
      iconStyle={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: spacing.tiny,
  },
});
