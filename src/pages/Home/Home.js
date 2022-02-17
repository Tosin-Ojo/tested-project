import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../actions/products";
import Header from "../../components/Header/Header";
import Product from "../../components/Product/Product";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { basket, products } = useSelector((state) => ({
    basket: state.basket,
    products: state.products,
  }));
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    navigate("/checkout");
  };

  const getProducts = useCallback(() => {
    dispatch(fetchProducts(setLoading));
  }, [dispatch]);

  useEffect(() => {
    if (products.length < 1) getProducts();
  }, [getProducts, products]);

  return (
    <div className="home">
      <Header basket={basket} />
      {loading ? (
        products.length < 1 && <div data-testid="loader__lg" className="loader__lg"></div>
      ) : (
        <>
          {products.length > 0 && (
            <>
              {products.map((product) => (
                <Product basket={basket} product={product} key={product.sku} />
              ))}
              <div className="home__button">
                <button onClick={handleClick}>Proceed To Checkout</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
