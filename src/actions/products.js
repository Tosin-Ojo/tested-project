import * as api from "../api";
import {
  CLEAR_BASKET,
  FETCH_PRODUCTS,
  SHOW_MESSAGE,
} from "../constants/actionTypes";

export const fetchProducts = (setLoading) => async (dispatch) => {
  setLoading(true);
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: FETCH_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        message: "An error occurred!",
        severity: error,
        duration: 5000,
        display: true,
      },
    });
  } finally {
    setLoading(false);
  }
};

export const checkoutProducts = (basket, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.checkoutProducts(basket);
    dispatch({ type: CLEAR_BASKET, payload: [] });
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        message: data.msg,
        severity: "success",
        duration: 5000,
        display: true,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        message: "An error occurred!",
        severity: "error",
        duration: 5000,
        display: true,
      },
    });
  } finally {
    setLoading(false);
  }
};
