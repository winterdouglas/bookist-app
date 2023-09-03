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
    shadow: "#000000",
  },
};

export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,

    textDim: "#A0A0A0",
    onPrimary: "#000000",
    shadow: "#666666",
  },
};
