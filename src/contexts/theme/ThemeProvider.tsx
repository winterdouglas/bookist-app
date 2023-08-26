import { PropsWithChildren } from "react";
import { ThemeContext } from "./ThemeContext";
import { useThemeData } from "./useThemeData";

type ThemeProviderProps = PropsWithChildren;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useThemeData();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
