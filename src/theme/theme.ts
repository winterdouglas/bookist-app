import {
  DarkTheme,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";

export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    textDim: "#666666",
    onPrimary: "#FFFFFF",
    secondary: "#AED7A0",
    onSecondary: "#FFFFFF",
    shadow: "#000000",
    tertiary: "#9BC88B",
    onTertiary: "#FFFFFF",
  },
};

export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,

    textDim: "#A0A0A0",
    onPrimary: "#000000",
    secondary: "#AED7A0",
    onSecondary: "#000000",
    shadow: "#FFFFFF",
    tertiary: "#9BC88B",
    onTertiary: "#000000",
  },
};
