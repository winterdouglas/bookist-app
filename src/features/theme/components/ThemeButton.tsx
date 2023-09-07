import { useAppTheme } from "@/features/theme/hooks/useAppTheme";
import { IconButton } from "@/components/IconButton";

export const ThemeButton = () => {
  const { currentTheme, setTheme } = useAppTheme();

  return (
    <IconButton
      preset="default"
      onPress={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      icon={currentTheme === "dark" ? "sunny-outline" : "moon-outline"}
    />
  );
};
