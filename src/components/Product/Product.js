import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../actions/basket";
import { formatCurrency } from "../../utils/numbers";

import "./Product.css";

const Product = ({ product, basket }) => {
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addToBasket(basket, product));
  };

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket(basket, product));
  };

  return (
    <div className="product" data-testid={`product-${product.sku}`}>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{formatCurrency(product.price)}</div>
      <button data-testid={`addBtn-${product.sku}`} onClick={handleAddToBasket}>
        Add to Basket
      </button>
      <button
        data-testid={`removeBtn-${product.sku}`}
        onClick={handleRemoveFromBasket}
      >
        Remove from Basket
      </button>
    </div>
  );
};

export default Product;
