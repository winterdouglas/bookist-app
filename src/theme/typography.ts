import { Platform } from "react-native";

const fonts = {
  /**
   * iOS only font.
   */
  avenirNext: {
    normal: "Avenir Next",
  },
  /**
   * Android only font.
   */
  sansSerif: {
    normal: "sans-serif",
  },
};

export const typography = {
  /**
   * The primary font. Used in most places.
   */
  primary: Platform.select({
    // TODO: Configure fonts appropriately
    ios: fonts.avenirNext,
    android: fonts.sansSerif,
  }),
};
