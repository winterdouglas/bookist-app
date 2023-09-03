import renderer from "react-test-renderer";
import { BackButton } from "./BackButton";
import { ThemeProvider } from "@/contexts";
import { NavigationContainer } from "@react-navigation/native";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <NavigationContainer>
        <ThemeProvider>
          <BackButton />
        </ThemeProvider>
      </NavigationContainer>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
