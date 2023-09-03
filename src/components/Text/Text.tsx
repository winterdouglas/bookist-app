import { ReactNode } from "react";
import {
  type StyleProp,
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

type Sizes = keyof typeof $sizeStyles;
type Presets = keyof typeof $presets;

export type TextProps = RNTextProps & {
  text?: string;
  preset?: Presets;
  size?: Sizes;
  children?: ReactNode;
};

export const Text = ({
  preset = "default",
  size,
  text,
  children,
  style: $styleOverride,
  ...rest
}: TextProps) => {
  const { colors } = useAppTheme();
  const content = text || children;

  const $styles = [
    $presets[preset],
    size && $sizeStyles[size],
    { color: colors.text },
    $styleOverride,
  ];

  return (
    <RNText selectable {...rest} style={$styles}>
      {content}
    </RNText>
  );
};

const $sizeStyles = {
  lg: { fontSize: 28 } as TextStyle,
  md: { fontSize: 20 } as TextStyle,
  sm: { fontSize: 16 } as TextStyle,
  xs: { fontSize: 12 } as TextStyle,
};

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  { fontWeight: "500" },
];

const $presets = {
  default: $baseStyle,
  heading: [
    $baseStyle,
    $sizeStyles.lg,
    { fontWeight: 900 },
  ] as StyleProp<TextStyle>,
  subheading: [
    $baseStyle,
    $sizeStyles.md,
    { fontWeight: 900 },
  ] as StyleProp<TextStyle>,
  list: [$baseStyle, { fontWeight: 600 }] as StyleProp<TextStyle>,
  subtitle: [
    $baseStyle,
    $sizeStyles.xs,
    { fontWeight: 700 },
  ] as StyleProp<TextStyle>,
};
