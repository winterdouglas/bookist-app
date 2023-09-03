import { useAutoImage } from "@/hooks/useAutoImage";
import { forwardRef } from "react";
import {
  Image,
  ImageProps as RNImageProps,
  ImageURISource,
} from "react-native";

export type AutoImageProps = RNImageProps & {
  maxWidth?: number;
  maxHeight?: number;
};

/**
 * An Image component that automatically sizes a remote or data-uri image.
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md)
 */
export const AutoImage = forwardRef<Image, AutoImageProps>((props, ref) => {
  const { maxWidth, maxHeight, ...ImageProps } = props;
  const source = props.source as ImageURISource;

  const [width, height] = useAutoImage(source?.uri, [maxWidth, maxHeight]);

  return (
    <Image ref={ref} {...ImageProps} style={[{ width, height }, props.style]} />
  );
});
