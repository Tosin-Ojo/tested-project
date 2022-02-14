import { HIDE_MESSAGE, SHOW_MESSAGE } from "../constants/actionTypes";

export const showMessage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_MESSAGE, payload });
  } catch (error) {
    console.log(error);
  }
};

export const hideMessage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: HIDE_MESSAGE, payload });
  } catch (error) {
    console.log(error);
  }
};
