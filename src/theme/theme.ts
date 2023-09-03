import {
  DarkTheme,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,

      textDim: "#666666",
      onPrimary: "#FFFFFF",
      shadow: "#000000",
    },
  } as ExtendedTheme,

  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,

      textDim: "#A0A0A0",
      onPrimary: "#000000",
      shadow: "#666666",
    },
  } as ExtendedTheme,
};

export type AppTheme = keyof typeof theme | "auto";
