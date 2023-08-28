import { useSearchBooksQuery } from "@/features/search/services/searchApi";
import { View, Text } from "react-native";

export const SearchScreen = () => {
  const { status, data } = useSearchBooksQuery({
    q: "lord of the rings",
    page: 9,
  });

  return (
    <View>
      <Text>Result: {status}</Text>
      <Text>Count: {JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};
