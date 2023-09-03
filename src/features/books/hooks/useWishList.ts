import { useCallback } from "react";
import {
  selectIsWishedBook,
  toggleWishedBook,
} from "@/features/books/store/wishListSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

export const useWishList = (bookId: string) => {
  const dispatch = useAppDispatch();

  const isWishedBook = useAppSelector((state) =>
    selectIsWishedBook(state, bookId),
  );

  const toggleWished = useCallback(() => {
    dispatch(toggleWishedBook(bookId));
  }, [bookId, dispatch]);

  return { isWishedBook, toggleWished };
};
