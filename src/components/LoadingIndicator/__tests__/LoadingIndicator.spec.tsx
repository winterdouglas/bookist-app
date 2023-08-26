import renderer from "react-test-renderer";
import { LoadingIndicator } from "../LoadingIndicator";

test("renders correctly", () => {
  const tree = renderer.create(<LoadingIndicator />).toJSON();
  expect(tree).toMatchSnapshot();
});
