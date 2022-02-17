import { screen, cleanup, fireEvent } from "@testing-library/react";
import { renderWithRedux } from "../../../testUtils";
import Product from "../Product";
import "@testing-library/jest-dom/extend-expect";

const product = {
  sku: 1,
  name: "Product One",
  description: "Product One description",
  price: 1.11,
  basketLimit: 5,
};

describe("Product Component", () => {
  afterEach(cleanup);

  it("should render product correctly", () => {
    renderWithRedux(<Product product={product} />);
    const name = screen.getByText("Product One");
    expect(name).toBeVisible();
    const description = screen.getByText("Product One description");
    expect(description).toBeVisible();
    const price = screen.getByText("£1.11");
    expect(price).toBeVisible();
    const addBtn = screen.getByRole("button", { name: /Add to Basket/i });
    expect(addBtn).toBeVisible();
    const removeBtn = screen.getByRole("button", {
      name: /Remove from Basket/i,
    });
    expect(removeBtn).toBeVisible();
  });
});
