import { FETCH_PRODUCTS } from "../constants/actionTypes";

const products = (products = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;

    default:
      return products;
  }
};

export default products;
