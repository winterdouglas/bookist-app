import { useCallback } from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useAnimatedSearchStyle = () => {
  const { height } = useWindowDimensions();
  const initialPosition = height / 3;
  const translateY = useSharedValue(initialPosition);

  const animateSearch = useCallback(() => {
    translateY.value = 0;
  }, [translateY]);

  const resetAnimation = useCallback(() => {
    translateY.value = initialPosition;
  }, [initialPosition, translateY]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateY: withSpring(translateY.value, { stiffness: 50 }) },
    ],
  }));

  return { animatedStyles, animateSearch, resetAnimation };
};
