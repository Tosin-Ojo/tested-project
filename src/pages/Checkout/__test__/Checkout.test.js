import { screen, cleanup, fireEvent } from "@testing-library/react";
import { renderWithRedux } from "../../../testUtils";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Checkout from "../Checkout";
import "@testing-library/jest-dom/extend-expect";

const basket = [
  {
    basketLimit: 4,
    description: "Product Two Description",
    name: "Product Two",
    price: 2.22,
    quantity: 2,
    sku: 2,
  },
  {
    basketLimit: 5,
    description: "Product One Description",
    name: "Product Ine",
    price: 1.11,
    quantity: 1,
    sku: 1,
  },
];

export const handlers = [
  rest.post("http://localhost:5000/checkout", (req, res, ctx) => {
    return res(
      ctx.json({ msg: "The checkout transaction was completed successfully." }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const MockCheckout = () => {
  return (
    <BrowserRouter>
      <Checkout />
    </BrowserRouter>
  );
};

describe("Checkout Component", () => {
  afterEach(cleanup);

  it("should render checkout page properly when basket is not empty", () => {
    renderWithRedux(<MockCheckout />, { initialState: { basket } });
    expect(screen.getByText(/items: 3/i)).toBeVisible();
    expect(screen.getByText(/£5.55/i)).toBeVisible();
    expect(
      screen.getByRole("button", { name: /continue shopping/i })
    ).toBeVisible();
    expect(screen.getByRole("button", { name: /checkout/i })).toBeVisible();
    expect(screen.getByPlaceholderText(/Enter card details/i)).toBeVisible();
    expect(screen.getAllByTestId(/checkoutProduct/i).length).toBe(2);
  });

  it("should render checkout page properly when basket is empty", () => {
    renderWithRedux(<MockCheckout />, { initialState: { basket: [] } });
    expect(screen.getByText(/item: 0/i)).toBeVisible();
    expect(
      screen.getByRole("button", { name: /continue shopping/i })
    ).toBeVisible();
    expect(screen.queryByRole("button", { name: /checkout/i })).toBe(null);
    expect(screen.queryByPlaceholderText(/Enter card details/i)).toBe(null);
    expect(screen.queryAllByTestId(/checkoutProduct/i).length).toBe(0);
  });

  it("should change and remove items quantity correctly", () => {
    renderWithRedux(<MockCheckout />, { initialState: { basket } });
    const select = screen.getByTestId("quantity-1");
    fireEvent.change(select, { target: { value: 5 } });
    expect(screen.getByText(/items: 7/i)).toBeVisible();
    expect(screen.getByText(/£9.99/i)).toBeVisible();
    const removeBtn = screen.getByTestId(/removeAllBtn-1/i);
    fireEvent.click(removeBtn);
    expect(screen.getByText(/items: 2/i)).toBeVisible();
    expect(screen.getByText(/£2.22/i)).toBeVisible();
  });

  it("should checkout properly", async () => {
    renderWithRedux(<MockCheckout />, { initialState: { basket } });
    const checkoutBtn = await screen.findByRole("button", {
      name: /checkout/i,
    });
    expect(checkoutBtn.disabled).toBe(true);
    const textInput = await screen.findByPlaceholderText(/Enter card details/i);
    fireEvent.change(textInput, { target: { value: "123456789" } });
    expect(await screen.findByText(/invalid card details/i)).toBeVisible();
    expect(checkoutBtn.disabled).toBe(true);
    fireEvent.change(textInput, { target: { value: "4539456463019519" } });
    expect(screen.queryByText(/invalid card details/i)).toBe(null);
    expect(checkoutBtn.disabled).toBe(false);
    fireEvent.click(checkoutBtn);
    expect(await screen.findByText(/item: 0/i)).toBeVisible();
    expect(
      await screen.findByRole("button", { name: /continue shopping/i })
    ).toBeVisible();
    expect(screen.queryByRole("button", { name: /checkout/i })).toBe(null);
    expect(screen.queryByPlaceholderText(/Enter card details/i)).toBe(null);
    expect(screen.queryAllByTestId(/checkoutProduct/i).length).toBe(0);
  });
});
