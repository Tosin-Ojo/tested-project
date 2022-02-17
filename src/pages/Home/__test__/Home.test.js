import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { renderWithRedux } from "../../../testUtils";
import Home from "../Home";
import "@testing-library/jest-dom/extend-expect";

const products = [
  {
    sku: 1,
    name: "Product One",
    description: "Product One description",
    price: 1.11,
    basketLimit: 5,
  },
  {
    sku: 2,
    name: "Product Two",
    description: "Product Two description",
    price: 2.22,
    basketLimit: 4,
  },
  {
    sku: 3,
    name: "Product Three",
    description: "Product Three description",
    price: 3.33,
    basketLimit: 3,
  },
  {
    sku: 4,
    name: "Product Four",
    description: "Product Four description",
    price: 4.44,
    basketLimit: 2,
  },
  {
    sku: 5,
    name: "Product Five",
    description: "Product Five description",
    price: 5.55,
    basketLimit: 1,
  },
];

export const handlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(ctx.json(products), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const MockHomeRouter = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("Home Component", () => {
  afterEach(cleanup);

  it("should render correctly", async () => {
    renderWithRedux(<MockHomeRouter />);
    const loader = await screen.findByTestId("loader__lg");
    expect(loader).toBeInTheDocument();

    const product = await screen.findByTestId("product-1");
    expect(product).toBeInTheDocument();

    const allProducts = await screen.findAllByTestId(/product/i);
    expect(allProducts.length).toBe(5);
  });

  it("should add and remove from basket", async () => {
    renderWithRedux(<MockHomeRouter />);
    const addBtn = await screen.findByTestId("addBtn-1");
    fireEvent.click(addBtn);
    expect(await screen.findByText(/item: 1/i)).toBeVisible();
    const removeBtn = await screen.findByTestId("removeBtn-1");
    fireEvent.click(removeBtn);
    expect(await screen.findByText(/item: 0/i)).toBeVisible();
  });

  it("should be able to add multiple items to basket", async () => {
    renderWithRedux(<MockHomeRouter />);
    const addBtn1 = await screen.findByTestId("addBtn-1");
    const addBtn2 = await screen.findByTestId("addBtn-2");
    const addBtn3 = await screen.findByTestId("addBtn-3");
    fireEvent.click(addBtn1);
    fireEvent.click(addBtn2);
    fireEvent.click(addBtn2);
    fireEvent.click(addBtn3);
    expect(await screen.findByText(/items: 4/i)).toBeVisible();
    const removeBtn1 = await screen.findByTestId("removeBtn-1");
    const removeBtn2 = await screen.findByTestId("removeBtn-2");
    fireEvent.click(removeBtn1);
    fireEvent.click(removeBtn2);
    expect(await screen.findByText(/item: 1/i)).toBeVisible();
  });

  it("should not be able to add more than the basket limit", async () => {
    renderWithRedux(<MockHomeRouter />);
    const addBtn = await screen.findByTestId("addBtn-4");
    let i = products[3].basketLimit;
    while (i >= 0) {
      fireEvent.click(addBtn);
      i--;
    }
    expect(await screen.findByText(/items: 2/i)).toBeVisible();
  });

  it("should add items to basket with correlated prices", async () => {
    renderWithRedux(<MockHomeRouter />);
    const addBtn1 = await screen.findByTestId("addBtn-1");
    const addBtn2 = await screen.findByTestId("addBtn-2");
    const addBtn3 = await screen.findByTestId("addBtn-3");
    fireEvent.click(addBtn1);
    fireEvent.click(addBtn2);
    fireEvent.click(addBtn2);
    fireEvent.click(addBtn3);
    fireEvent.click(addBtn3);
    fireEvent.click(addBtn3);
    expect(screen.getByText(/£15.54/i)).toBeVisible();
  });
});
