import { View, StyleSheet } from "react-native";
import { SearchBar } from "@/components/SearchBar";

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar selectTextOnFocus />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
