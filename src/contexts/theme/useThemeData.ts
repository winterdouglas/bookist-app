import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/theme";

export const useThemeData = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "light" ? lightTheme : darkTheme;
};

export type ThemeContextType = ReturnType<typeof useThemeData>;
