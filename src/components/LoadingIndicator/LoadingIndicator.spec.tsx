import renderer from "react-test-renderer";
import { LoadingIndicator } from "./LoadingIndicator";
import { ThemeProvider } from "@/contexts";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <LoadingIndicator />
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
