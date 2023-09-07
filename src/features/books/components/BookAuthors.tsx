import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "@/components/Text";
import { unique } from "@/utils";

export const BookAuthors: FC<{ authors?: string[] }> = ({ authors = [] }) => {
  const uniqueAuthors = unique(authors);

  return authors.length ? (
    <>
      {uniqueAuthors.map((author) => (
        <Text
          key={author}
          text={author}
          preset="list"
          numberOfLines={3}
          style={styles.text}
        />
      ))}
    </>
  ) : null;
};

const styles = StyleSheet.create({
  text: { flexWrap: "wrap" },
});
