import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import "@testing-library/jest-dom/extend-expect";

const MockHeaderRouter = ({ basket, checkout }) => {
  return (
    <BrowserRouter>
      <Header basket={basket} checkout={checkout} />
    </BrowserRouter>
  );
};

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

describe("Header Component", () => {
  afterEach(cleanup);

  it("should render home header correctly", () => {
    render(<MockHeaderRouter basket={basket} />);
    const basketItems = screen.getByRole("link", { name: /Basket Item/i });
    expect(basketItems).toBeVisible();
    expect(basketItems.href).toBe("http://localhost/checkout");
    const basketPrice = screen.getByRole("link", { name: /Total Price/i });
    expect(basketPrice).toBeVisible();
    expect(basketPrice.href).toBe("http://localhost/checkout");
    const totalItems = screen.getByText(/7/);
    expect(totalItems).toBeVisible();
    const totalPrice = screen.getByText(/£9.99/);
    expect(totalPrice).toBeVisible();
  });

  it("should render not 'Total Price' in checkout", () => {
    render(<MockHeaderRouter basket={basket} checkout />);
    const basketPrice = screen.getByRole("link");
    expect(basketPrice).not.toHaveTextContent(/Total Price/i);
  });

  it("should render singular 'item' when basket is one", () => {
    const basket = [
      {
        sku: 1,
        name: "Product One",
        description: "Product One description",
        price: 1.11,
        basketLimit: 5,
        quantity: 1,
      },
    ];
    render(<MockHeaderRouter basket={basket} checkout />);
    const basketPrice = screen.getByRole("link");
    expect(basketPrice).not.toHaveTextContent(/Items/i);
  });

  it("should render singular 'item' when basket is zero", () => {
    const basket = [];
    render(<MockHeaderRouter basket={basket} checkout />);
    const basketPrice = screen.getByRole("link");
    expect(basketPrice).not.toHaveTextContent(/Items/i);
  });
});
