import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "@/components/BackButton";
import { HeaderBackButtonProps } from "@react-navigation/elements";

export const useBackButton = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: HeaderBackButtonProps) =>
        props.canGoBack && <BackButton />,
    });
  }, [navigation]);
};
