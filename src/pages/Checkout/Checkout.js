import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutProducts } from "../../actions/products";
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import Header from "../../components/Header/Header";
import luhnCheck from "../../utils/luhnCheck";
import { basketTotal, formatCurrency } from "../../utils/numbers";

import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket);
  const [card, setCard] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setCard(e.target.value);
    if (!luhnCheck(e.target.value)) setValid(false);
    else setValid(true);
  };

  const handleCheckout = () => {
    if (!luhnCheck(card)) return false;
    setLoading(true);
    dispatch(checkoutProducts({ basket, cardNumber: card }, setLoading));
  };

  return (
    <div className="checkout">
      <Header basket={basket} checkout />
      <div className="checkout__header">
        <div>PRODUCT NAME</div>
        <div>SELECTED QUANTITY</div>
        <div>UNIT PRICE</div>
        <div>TOTAL PRICE</div>
      </div>
      <>
        {basket.length < 1 ? (
          <h3 style={{ textAlign: "center" }}>No Item Basket</h3>
        ) : (
          basket.map((bask) => (
            <CheckoutProduct product={bask} basket={basket} key={bask.sku} />
          ))
        )}
      </>
      {basket.length > 0 && (
        <>
          <div className="checkout__total">
            Total Price: {formatCurrency(basketTotal(basket))}
          </div>
          <div className="checkout__input">
            <label>
              Input Your Card Details
              <input type="text" value={card} onChange={handleChange} />
            </label>
            {!valid && (
              <span className="checkout__error">Invalid card details</span>
            )}
          </div>
        </>
      )}
      <div className="checkout__button">
        <button onClick={handleContinue}>Continue Shopping</button>
        {basket.length > 0 && (
          <button
            style={{ opacity: !valid || card === "" ? "0.5" : "" }}
            onClick={handleCheckout}
            disabled={!valid}
          >
            Checkout
            {loading && <div className="loader__sm"></div>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
