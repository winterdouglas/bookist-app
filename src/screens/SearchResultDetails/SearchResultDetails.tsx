import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookCoverImage } from "@/features/search/components/BookCoverImage";
import { useBackButton } from "@/hooks/useBackButton";
import { AppStackParamList } from "@/navigation";

export const SearchResultDetailsScreen = ({
  route,
}: NativeStackScreenProps<AppStackParamList, "SearchResultDetails">) => {
  // Ideally this should be in a Screen component, for now it will do
  useBackButton();

  return (
    <View style={styles.container}>
      <BookCoverImage preset="detail" coverId={route.params.coverId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
