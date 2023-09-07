import {
  DarkTheme,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";

export const pastelColors: string[] = [
  "#FFD1DC",
  "#FFC3A0",
  "#FFDFC1",
  "#B5EAD7",
  "#A7C5EB",
  "#C8A2C8",
  "#FFABAB",
  "#FFE4A4",
  "#A2DED0",
  "#E6D4E6",
];

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
