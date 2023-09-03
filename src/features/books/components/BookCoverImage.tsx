import { FC } from "react";
import { ImageStyle, Platform, StyleProp } from "react-native";
import Animated, {
  SharedTransition,
  withTiming,
} from "react-native-reanimated";
import { AutoImage, AutoImageProps } from "@/components/AutoImage";
import { Config } from "@/config";
import { timing } from "@/theme";

export const AnimatedAutoImage = Animated.createAnimatedComponent(AutoImage);

const imageTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withTiming(values.targetHeight, { duration: timing.quick }),
    width: withTiming(values.targetWidth, { duration: timing.quick }),
    originX: withTiming(values.targetOriginX, { duration: timing.quick }),
    originY: withTiming(values.targetOriginY, { duration: timing.quick }),
  };
});

export type BookCoverImageProps = Omit<AutoImageProps, "source"> & {
  coverId?: number;
  animated?: boolean;
  preset?: keyof typeof $presets;
};

export const BookCoverImage: FC<BookCoverImageProps> = ({
  coverId,
  preset = "list",
  animated = Platform.OS === "ios",
  ...props
}) => {
  const id = coverId?.toString();
  const $sizeProps = $presets[preset];
  const $styles: StyleProp<ImageStyle> = [props.style];

  return id ? (
    <AnimatedAutoImage
      source={{
        uri: `${Config.COVERS_URL}/b/id/${id}-M.jpg`,
      }}
      {...(animated
        ? {
            sharedTransitionTag: id,
            sharedTransitionStyle: imageTransition,
          }
        : {})}
      {...$sizeProps}
      {...props}
      style={$styles}
    />
  ) : null;
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
