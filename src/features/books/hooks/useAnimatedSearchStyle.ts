import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useAnimatedSearchStyle = (searchTerm: string) => {
  const { height } = useWindowDimensions();
  const initialPosition = height / 3;
  const translateY = useSharedValue(initialPosition);
  const isSearching = searchTerm.length > 3;

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateY: withSpring(translateY.value, { stiffness: 50 }) },
    ],
  }));

  useEffect(() => {
    if (!isSearching) {
      translateY.value = initialPosition;

      return;
    }

    translateY.value = 0;
  }, [translateY, initialPosition, isSearching]);

  return { animatedStyles };
};
