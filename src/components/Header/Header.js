import React from "react";
import { Link } from "react-router-dom";
import { basketItems, basketTotal, formatCurrency } from "../../utils/numbers";
import "./Header.css";

const Header = ({ basket, checkout }) => {
  return (
    <div className="header">
      <Link to="/checkout">
        Basket {basketItems(basket) > 1 ? "items" : "Item"}:{" "}
        {basketItems(basket)}
      </Link>
      {!checkout && (
        <Link to="/checkout">
          Total Price: {formatCurrency(basketTotal(basket))}
        </Link>
      )}
    </div>
  );
};

export default Header;
