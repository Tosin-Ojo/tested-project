import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/numbers";

import { removeFromBasket, updateQuantity } from "../../actions/basket";

import "./CheckoutProduct.css";

const CheckoutProduct = ({ product, basket }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const quantityArray = [];
  let i = product.basketLimit;

  while (i > 0) {
    quantityArray.unshift(i);
    i--;
  }

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket(basket, product));
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
    dispatch(updateQuantity(basket, product.sku, parseInt(e.target.value)));
  };

  return (
    <div
      data-testid={`checkoutProduct-${product.sku}`}
      className="checkoutProduct"
    >
      <div>{product.name}</div>
      <select
        data-testid={`quantity-${product.sku}`}
        value={quantity}
        onChange={handleChange}
      >
        {quantityArray.map((quantity) => (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        ))}
      </select>
      <div>{formatCurrency(product.price)}</div>
      <div>{formatCurrency(product.price * product.quantity)}</div>
      <button
        data-testid={`removeAllBtn-${product.sku}`}
        onClick={handleRemoveFromBasket}
      >
        Remove All
      </button>
    </div>
  );
};

export default CheckoutProduct;
