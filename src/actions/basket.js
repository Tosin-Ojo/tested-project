import {
  ADD_TO_BASKET,
  CLEAR_BASKET,
  REMOVE_FROM_BASKET,
  SHOW_MESSAGE,
  UPDATE_QUANTITY,
} from "../constants/actionTypes";

export const addToBasket = (basket, product) => async (dispatch) => {
  try {
    const isPresent = basket.findIndex((item) => item.sku === product.sku);
    let limit;
    const newBasket = () => {
      if (isPresent !== -1) {
        return basket.map((bask) => {
          if (bask.sku === product.sku) {
            if (bask.basketLimit < bask.quantity + 1) {
              limit = true;
              return bask;
            }
            return { ...bask, quantity: bask.quantity + 1 };
          }
          return bask;
        });
      }
      return [...basket, { ...product, quantity: 1 }];
    };
    dispatch({ type: ADD_TO_BASKET, payload: newBasket() });
    if (limit) {
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          message: "Basket limit reached!",
          severity: "error",
          duration: 5000,
          display: true,
        },
      });
    } else {
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          message: "Item Added!",
          severity: "success",
          duration: 5000,
          display: true,
        },
      });
    }
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
  }
};

export const removeFromBasket = (basket, product) => async (dispatch) => {
  try {
    const newBasket = () => {
      return basket.filter((bask) => bask.sku !== product.sku);
    };

    dispatch({ type: REMOVE_FROM_BASKET, payload: newBasket() });
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        message: "Item removed!",
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
  }
};

export const updateQuantity = (basket, sku, quantity) => async (dispatch) => {
  try {
    const newBasket = () => {
      return basket.map((bask) => {
        if (bask.sku === sku) return { ...bask, quantity };
        return bask;
      });
    };

    dispatch({ type: UPDATE_QUANTITY, payload: newBasket() });
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        message: "Quantity Updated!",
        severity: "success",
        duration: 5000,
        display: true,
      },
    });
  } catch (error) {
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        message: "An error occurred",
        severity: "error",
        duration: 5000,
        display: true,
      },
    });
  }
};

export const clearBasket = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BASKET, payload: [] });
  } catch (error) {
    console.log(error);
  }
};
