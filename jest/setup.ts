import "@testing-library/jest-native/extend-expect";

// libraries to mock
jest.mock("react-native-config", () => ({
  API_URL: "",
}));

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: () =>
          new Promise<void>((resolve) => {
            console.warn("This is mocked and doesn't have any effect.");
            resolve();
          }),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

jest.useFakeTimers();
