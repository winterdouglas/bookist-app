import { useEffect, useState } from "react";
import { Platform, useWindowDimensions } from "react-native";
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

  // TODO: This state ensures that the header has enough space to display the input on Android
  // Sadly cannot go without this workaround for now.
  const [androidHeaderHeight, setAndroidHeaderHeight] = useState<
    number | undefined
  >(Platform.OS === "android" ? height : undefined);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateY: withSpring(translateY.value, { stiffness: 50 }) },
    ],
    height: androidHeaderHeight,
  }));

  useEffect(() => {
    if (!isSearching) {
      translateY.value = initialPosition;

      if (Platform.OS === "android") {
        setAndroidHeaderHeight(height);
      }
      return;
    }

    translateY.value = 0;

    if (Platform.OS === "android") {
      setAndroidHeaderHeight(undefined);
    }
  }, [translateY, initialPosition, height, isSearching]);

  return { animatedStyles };
};
