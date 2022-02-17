import { screen, cleanup, fireEvent } from "@testing-library/react";
import { renderWithRedux } from "../../../testUtils";
import CheckouProduct from "../CheckoutProduct";
import "@testing-library/jest-dom/extend-expect";

const basket = [
  {
    sku: 1,
    name: "Product One",
    description: "Product One description",
    price: 1.11,
    basketLimit: 5,
    quantity: 5,
  },
  {
    sku: 2,
    name: "Product Two",
    description: "Product Two description",
    price: 2.22,
    basketLimit: 4,
    quantity: 2,
  },
];

const product = {
  sku: 2,
  name: "Product Two",
  description: "Product Two description",
  price: 2.22,
  basketLimit: 4,
  quantity: 2,
};

describe("CheckoutProduct Component", () => {
  afterEach(cleanup);

  it("should render checkout product correctly", () => {
    renderWithRedux(<CheckouProduct product={product} basket={basket} />);
    const name = screen.getByText("Product Two");
    expect(name).toBeVisible();
    const select = screen.getByTestId("quantity-2");
    expect(select).toBeVisible();
    expect(select.value).toBe("2");
    const price = screen.getByText("£2.22");
    expect(price).toBeVisible();
    const total = screen.getByText("£4.44");
    expect(total).toBeVisible();
    const removeBtn = screen.getByRole("button", { name: /Remove All/i });
    expect(removeBtn).toBeVisible();
  });

  it("should change to selected option", () => {
    renderWithRedux(<CheckouProduct product={product} basket={basket} />);
    const select = screen.getByTestId("quantity-2");
    fireEvent.change(select, { target: { value: "4" } });
    expect(select.value).toBe("4");
  });
});
