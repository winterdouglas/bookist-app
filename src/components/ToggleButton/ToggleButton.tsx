import { FC } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Icon, IconProps } from "@/components/Icon";
import { spacing } from "@/theme";
import { useTheme } from "@/hooks/useTheme";

export type ToggleButtonProps = Omit<IconProps, "name" | "color" | "size"> & {
  icon: IconProps["name"];
  size?: keyof typeof $iconSizePresets;
  toggled?: boolean;
  onToggleChanged?: (toggled: boolean) => void;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  style,
  icon,
  size = "medium",
  toggled,
  onToggleChanged,
  ...props
}) => {
  const { colors } = useTheme();

  const $containerStyle: StyleProp<ViewStyle> = [
    { justifyContent: "center", alignItems: "center" },
    $containerSizePresets[size],
    { backgroundColor: toggled ? colors.primary : colors.border },
    style,
  ];

  return (
    <Pressable
      onPress={() => onToggleChanged?.(!toggled)}
      {...props}
      style={$containerStyle}>
      <Icon
        name={icon}
        color={toggled ? colors.onPrimary : colors.text}
        size={$iconSizePresets[size]}
      />
    </Pressable>
  );
};

const $iconSizePresets = {
  medium: spacing.large,
};

const $containerSizePresets = {
  medium: {
    width: spacing.huge,
    height: spacing.huge,
    borderRadius: spacing.extraSmall,
  } as StyleProp<ViewStyle>,
};
