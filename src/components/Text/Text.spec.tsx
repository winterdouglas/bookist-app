import renderer from "react-test-renderer";
import { Text } from "./Text";
import { ThemeProvider } from "@/contexts";

it("renders correctly", () => {
  const component = renderer.create(
    <ThemeProvider>
      <Text text="just some fake text!" />
    </ThemeProvider>,
  );

  expect(component.toJSON()).toMatchSnapshot();
});
