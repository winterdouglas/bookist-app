import renderer from "react-test-renderer";
import { SearchInput } from "./SearchInput";
import { ThemeProvider } from "@/contexts";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <SearchInput />
      </ThemeProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
