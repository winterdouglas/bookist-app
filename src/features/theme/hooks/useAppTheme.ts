import { useColorScheme } from "react-native";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectTheme,
  setSelectedTheme,
} from "@/features/theme/store/themeSlice";
import { AppTheme, theme } from "@/theme";
import { useCallback } from "react";

export const useAppTheme = () => {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector(selectTheme);
  const deviceTheme = useColorScheme();
  const currentTheme =
    !selectedTheme || selectedTheme === "auto"
      ? deviceTheme || "dark"
      : selectedTheme;

  const setTheme = useCallback(
    (theTheme: AppTheme) => {
      dispatch(setSelectedTheme(theTheme));
    },
    [dispatch],
  );

  return { ...theme[currentTheme], currentTheme, setTheme };
};
