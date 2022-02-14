import { HIDE_MESSAGE, SHOW_MESSAGE } from "../constants/actionTypes";

const alert = (alert = {}, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return action.payload;
    case HIDE_MESSAGE:
      return action.payload;

    default:
      return alert;
  }
};

export default alert;
