import { AppStore, RootState, setupStore } from "@/store/setupStore";
import {
  toggleWishedBook,
  selectIsWishedBook,
} from "@/features/books/store/wishListSlice";

describe("wishListSlice", () => {
  let store: AppStore;

  const wishListSlice = () => store.getState().wishList;

  beforeEach(() => {
    const { store: appStore } = setupStore();
    store = appStore;
  });

  it("should be empty", () => {
    expect(wishListSlice().wishedBooksByBookId).toEqual({});
  });

  describe("toggleWishedBook", () => {
    it("should toggle the book as wished", () => {
      const id = "anything";

      store.dispatch(toggleWishedBook(id));

      expect(wishListSlice().wishedBooksByBookId[id]).toEqual(true);
    });

    it("should toggle the book as not wished", () => {
      const id = "another";

      store.dispatch(toggleWishedBook(id));
      store.dispatch(toggleWishedBook(id));

      expect(wishListSlice().wishedBooksByBookId[id]).toEqual(false);
    });
  });

  describe("selectors", () => {
    const createFakeState = (wishing: Record<string, boolean>): RootState => ({
      readingList: {} as never,
      search: {} as never,
      wishList: {
        wishedBooksByBookId: wishing,
      },
    });

    describe("selectIsWishedBook", () => {
      const state = createFakeState({
        "fake-id": true,
        "another-id": false,
      });

      const wished = selectIsWishedBook(state, "fake-id");
      const notWished = selectIsWishedBook(state, "another-id");
      const notSet = selectIsWishedBook(state, "non-existent");

      expect(wished).toBe(true);
      expect(notWished).toBe(false);
      expect(notSet).toBe(false);
    });
  });
});
