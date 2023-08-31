import { View, StyleSheet } from "react-native";
import { SearchList } from "@/features/search/components/SearchList";

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
