import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { BackButton } from "./BackButton";
import { setupStore } from "@/store";

it("renders correctly", () => {
  const { store } = setupStore();
  const tree = renderer
    .create(
      <Provider store={store}>
        <NavigationContainer>
          <BackButton />
        </NavigationContainer>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
