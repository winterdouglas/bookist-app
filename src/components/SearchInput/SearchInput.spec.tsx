import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { setupStore } from "@/store";
import { SearchInput } from "./SearchInput";

it("renders correctly", () => {
  const { store } = setupStore();
  const tree = renderer
    .create(
      <Provider store={store}>
        <SearchInput />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
