import renderer from "react-test-renderer";
import { Icon } from "./Icon";

it("renders correctly", () => {
  const tree = renderer.create(<Icon name="alarm" />).toJSON();
  expect(tree).toMatchSnapshot();
});
