import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { setupStore } from "@/store";
import { LoadingIndicator } from "./LoadingIndicator";

it("renders correctly", () => {
  const { store } = setupStore();
  const tree = renderer
    .create(
      <Provider store={store}>
        <LoadingIndicator />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
