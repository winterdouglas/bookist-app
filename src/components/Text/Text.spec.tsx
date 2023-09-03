import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { setupStore } from "@/store";
import { Text } from "./Text";

it("renders correctly", () => {
  const { store } = setupStore();
  const component = renderer.create(
    <Provider store={store}>
      <Text text="just some fake text!" />
    </Provider>,
  );

  expect(component.toJSON()).toMatchSnapshot();
});
