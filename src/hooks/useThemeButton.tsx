import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@/components/Icon";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/theme";
import { TouchableOpacity } from "react-native";

export const useThemeButton = () => {
  const navigation = useNavigation();
  const { colors, currentTheme, setTheme } = useAppTheme();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setTheme(currentTheme === "light" ? "dark" : "light")}>
          <Icon
            name={currentTheme === "dark" ? "sunny-outline" : "moon-outline"}
            size={spacing.extraLarge}
            color={colors.text}
          />
        </TouchableOpacity>
      ),
    });
  }, [colors.text, currentTheme, navigation, setTheme]);
};
