import { useCallback, useEffect } from "react";
import type { RootState } from "@/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  searchBooks,
  selectAllPagesBySearchTerm,
  selectStatusBySearchTerm,
} from "@/features/books/store/searchSlice";

export const useSearchBooks = (searchTerm: string) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) =>
    selectStatusBySearchTerm(state, searchTerm),
  );

  // select the current data from the store state for the provided term
  const data = useAppSelector((state: RootState) =>
    selectAllPagesBySearchTerm(state, searchTerm),
  );

  useEffect(() => {
    // upon mount or name change, if status is uninitialized, send a request
    if (status) {
      return;
    }

    dispatch(searchBooks(searchTerm));
  }, [status, searchTerm, dispatch]);

  const loadMore = useCallback(() => {
    dispatch(searchBooks(searchTerm));
  }, [dispatch, searchTerm]);

  // TODO: Pull to refresh
  const refetch = useCallback(() => {}, []);

  // derive status booleans for ease of use
  const isUninitialized = status === undefined;
  const isLoading = status === "pending" || status === undefined;
  const isError = status === "rejected";
  const isSuccess = status === "fulfilled";

  // return the import data for the caller of the hook to use
  return {
    data,
    isUninitialized,
    isLoading,
    isError,
    isSuccess,
    loadMore,
    refetch,
  };
};
