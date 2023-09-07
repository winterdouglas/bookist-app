import { FC } from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Icon, IconProps } from "@/components/Icon";
import { useAppTheme } from "@/features/theme/hooks/useAppTheme";
import { spacing } from "@/theme";

export type IconButtonProps = Omit<ViewProps, "children"> & {
  icon: IconProps["name"];
  preset?: keyof typeof $containerPresets;
  iconStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export const IconButton: FC<IconButtonProps> = ({
  preset = "default",
  icon,
  onPress,
  iconStyle: $iconStyleOverride,
  style: $containerStyleOverride,
  ...props
}) => {
  const { colors } = useAppTheme();

  const $themedContainerPresets = {
    default: {} as StyleProp<ViewStyle>,
    round: { backgroundColor: colors.text } as StyleProp<ViewStyle>,
  };

  const $themedIconPresets = {
    default: { color: colors.text } as StyleProp<TextStyle>,
    round: { color: colors.background } as StyleProp<TextStyle>,
  };

  const $containerStyles: StyleProp<ViewStyle> = [
    $containerPresets[preset],
    $themedContainerPresets[preset],
    $containerStyleOverride,
  ];

  const $iconStyles: StyleProp<ViewStyle> = [
    $themedIconPresets[preset],
    $iconStyleOverride,
  ];

  return (
    <TouchableOpacity {...props} onPress={onPress} style={$containerStyles}>
      <Icon size={spacing.extraLarge} name={icon} style={$iconStyles} />
    </TouchableOpacity>
  );
};

const $containerPresets = {
  default: {} as StyleProp<ViewStyle>,

  round: {
    borderRadius: spacing.huge / 2,
    width: spacing.huge,
    height: spacing.huge,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  } as StyleProp<ViewStyle>,
};
