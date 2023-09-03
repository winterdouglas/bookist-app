import { ComponentProps } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@/hooks/useTheme";
import { SearchScreen } from "@/screens/Search";
import { SearchResultDetailsScreen } from "@/screens/SearchResultDetails/SearchResultDetails";
import { Platform } from "react-native";

/**
 * This type allows TypeScript to know what routes are defined in the navigator.
 *
 * @see https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 * @see https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Search: undefined;
  SearchResultDetails: {
    searchTerm: string;
    id: string;
  };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

/**
 * @see https://reactnavigation.org/docs/stack-navigator
 */
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="SearchResultDetails"
        component={SearchResultDetailsScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          animation: Platform.OS === "android" ? "fade_from_bottom" : undefined,
        }}
      />
    </Stack.Navigator>
  );
};

type AppNavigatorProps = Partial<ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: AppNavigatorProps) => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
