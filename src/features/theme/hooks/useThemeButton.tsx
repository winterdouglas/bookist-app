import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeButton } from "@/features/theme/components/ThemeButton";

export const useThemeButton = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeButton />,
    });
  }, [navigation]);
};
