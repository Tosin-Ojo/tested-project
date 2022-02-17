import { screen, cleanup } from "@testing-library/react";
import { renderWithRedux } from "../../../testUtils";
import Alert from "../Alert";
import "@testing-library/jest-dom/extend-expect";

describe("Alert Component", () => {
  afterEach(cleanup);
  it("should render alert in the document", () => {
    renderWithRedux(<Alert />);
    const alert = screen.getByTestId("alert");
    expect(alert).toBeInTheDocument();
  });
});
