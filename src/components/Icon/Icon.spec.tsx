import renderer from "react-test-renderer";
import { ThemeProvider } from "@/contexts";
import { Icon } from "./Icon";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <Icon name="alarm" />
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
