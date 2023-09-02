import { View, StyleSheet } from "react-native";
import { SearchableList } from "@/features/search/components/SearchableList";

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchableList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
