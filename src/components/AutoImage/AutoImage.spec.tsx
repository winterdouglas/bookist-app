import renderer from "react-test-renderer";
import { AutoImage } from "./AutoImage";

it("renders correctly", () => {
  const tree = renderer
    .create(<AutoImage source={{}} maxWidth={100} maxHeight={200} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
