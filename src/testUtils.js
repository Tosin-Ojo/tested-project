import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

export const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      reducers,
      initialState,
      compose(applyMiddleware(thunk))
    ),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};
