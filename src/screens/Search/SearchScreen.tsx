import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchableList } from "@/features/books/components/SearchableList";
import { useThemeButton } from "@/features/theme/hooks/useThemeButton";

export const SearchScreen = () => {
  const insets = useSafeAreaInsets();

  useThemeButton();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <SearchableList style={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
