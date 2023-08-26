import { Text, View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { darkTheme, lightTheme } from "@/theme";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "./ThemeProvider";

describe("ThemeContext", () => {
  const mockedColorScheme = jest.fn();

  jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
    __esModule: true,
    default: mockedColorScheme,
  }));

  it("should use the light theme when the color scheme is light", async () => {
    mockedColorScheme.mockReturnValueOnce("light");

    const expected = JSON.stringify(lightTheme);

    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>,
    );

    const themeColors = await screen.findByTestId("theme-colors");

    expect(themeColors).toHaveTextContent(expected);
  });

  it("should use the dark theme when the color scheme is dark", async () => {
    mockedColorScheme.mockReturnValueOnce("dark");

    const expected = JSON.stringify(darkTheme);

    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>,
    );

    const themeColors = await screen.findByTestId("theme-colors");

    expect(themeColors).toHaveTextContent(expected);
  });
});

const MockComponent = () => {
  const theme = useTheme();

  return (
    <View>
      <Text testID="theme-colors">{JSON.stringify(theme)}</Text>
    </View>
  );
};
