import { FC } from "react";
import { ImageStyle, Platform, StyleProp, StyleSheet } from "react-native";
import Animated, {
  SharedTransition,
  withTiming,
} from "react-native-reanimated";
import { AutoImage, AutoImageProps } from "@/components/AutoImage";
import { Config } from "@/config";
import { spacing, timing } from "@/theme";
import { useTheme } from "@/hooks/useTheme";

export const AnimatedAutoImage = Animated.createAnimatedComponent(AutoImage);

const customTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withTiming(values.targetHeight, { duration: timing.quick }),
    width: withTiming(values.targetWidth, { duration: timing.quick }),
    originX: withTiming(values.targetOriginX, { duration: timing.quick }),
    originY: withTiming(values.targetOriginY, { duration: timing.quick }),
  };
});

export type BookCoverImageProps = Omit<AutoImageProps, "source"> & {
  bookId: string;
  coverId?: number;
  animated?: boolean;
  preset?: keyof typeof $presets;
};

export const BookCoverImage: FC<BookCoverImageProps> = ({
  bookId,
  coverId,
  preset = "list",
  style,
  animated = Platform.OS === "ios",
  ...props
}) => {
  const $sizeProps = $presets[preset];
  const $styles: StyleProp<ImageStyle> = [styles.cover, style];
  const { colors } = useTheme();

  const $animatedProps = animated
    ? {
        sharedTransitionTag: bookId,
        sharedTransitionStyle: customTransition,
      }
    : {};

  if (!coverId) {
    return (
      <Animated.View
        {...$animatedProps}
        style={[
          styles.emptyContainer,
          {
            width: $sizeProps.maxWidth,
            height: $sizeProps.maxHeight,
            backgroundColor: colors.textDim,
          },
          $styles,
        ]}
      />
    );
  }

  return (
    <AnimatedAutoImage
      source={{
        uri: `${Config.COVERS_URL}/b/id/${coverId}-M.jpg`,
      }}
      {...$animatedProps}
      {...$sizeProps}
      {...props}
      style={$styles}
    />
  );
};

const $presets = {
  detail: {
    width: 300,
    maxWidth: 300,
    height: 400,
    maxHeight: 400,
  },
  list: {
    maxWidth: 100,
    maxHeight: 160,
  },
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    overflow: "hidden",
    borderRadius: spacing.medium,
  },
});
