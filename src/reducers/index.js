import { combineReducers } from "redux";
import products from "./products";
import basket from "./basket";
import alert from "./alert";

export default combineReducers({
  products,
  basket,
  alert,
});
