import { AppStore, RootState, setupStore } from "@/store/setupStore";
import { selectIsReadingBook, toggleReadingBook } from "./readingListSlice";

describe("readingListSlice", () => {
  let store: AppStore;

  const readingListSlice = () => store.getState().readingList;

  beforeEach(() => {
    const { store: appStore } = setupStore();
    store = appStore;
  });

  it("should be empty", () => {
    expect(readingListSlice().readingBooksByBookId).toEqual({});
  });

  describe("toggleReadingBook", () => {
    it("should toggle the book as reading", () => {
      const id = "anything";

      store.dispatch(toggleReadingBook(id));

      expect(readingListSlice().readingBooksByBookId[id]).toEqual(true);
    });

    it("should toggle the book as not reading", () => {
      const id = "another";

      store.dispatch(toggleReadingBook(id));
      store.dispatch(toggleReadingBook(id));

      expect(readingListSlice().readingBooksByBookId[id]).toEqual(false);
    });
  });

  describe("selectors", () => {
    const createFakeState = (reading: Record<string, boolean>): RootState => ({
      readingList: {
        readingBooksByBookId: reading,
      },
      theme: {} as never,
      search: {} as never,
      wishList: {} as never,
    });

    describe("selectIsReadingBook", () => {
      const state = createFakeState({
        "fake-id": true,
        "another-id": false,
      });

      const reading = selectIsReadingBook(state, "fake-id");
      const notReading = selectIsReadingBook(state, "another-id");
      const notSet = selectIsReadingBook(state, "non-existent");

      expect(reading).toBe(true);
      expect(notReading).toBe(false);
      expect(notSet).toBe(false);
    });
  });
});
