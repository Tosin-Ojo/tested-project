import {
  ADD_TO_BASKET,
  CLEAR_BASKET,
  REMOVE_FROM_BASKET,
  UPDATE_QUANTITY,
} from "../constants/actionTypes";

const basket = (basket = [], action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return action.payload;

    case REMOVE_FROM_BASKET:
      return action.payload;

    case UPDATE_QUANTITY:
      return action.payload;

    case CLEAR_BASKET:
      return action.payload;

    default:
      return basket;
  }
};

export default basket;
