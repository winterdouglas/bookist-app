import { FC } from "react";
import { Text, TextProps } from "@/components/Text";

export type BookTitleProps = Omit<TextProps, "text" | "preset"> & {
  title?: string;
  preset?: keyof typeof $presets;
};

export const BookTitle: FC<BookTitleProps> = ({
  preset = "list",
  title,
  ...props
}) => {
  return (
    <Text text={title} preset={$presets[preset]} numberOfLines={2} {...props} />
  );
};

const $presets = {
  list: "subheading" as TextProps["preset"],
  detail: "heading" as TextProps["preset"],
};
