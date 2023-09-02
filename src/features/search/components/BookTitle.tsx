import { Text, TextProps } from "@/components/Text";
import { FC } from "react";

export type BookTitleProps = Omit<TextProps, "text"> & { title?: string };

export const BookTitle: FC<BookTitleProps> = (props) => {
  return <Text text={props.title} preset="heading" numberOfLines={2} />;
};
