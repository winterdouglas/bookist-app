import { useCallback } from "react";
import {
  selectIsReadingBook,
  toggleReadingBook,
} from "@/features/books/store/readingListSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

export const useReadingList = (bookId: string) => {
  const dispatch = useAppDispatch();

  const isReadingBook = useAppSelector((state) =>
    selectIsReadingBook(state, bookId),
  );

  const toggleReading = useCallback(() => {
    dispatch(toggleReadingBook(bookId));
  }, [bookId, dispatch]);

  return { isReadingBook, toggleReading };
};
