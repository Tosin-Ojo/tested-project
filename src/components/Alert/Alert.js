import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideMessage } from "../../actions/alert";
import "./Alert.css";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const backgroundColor =
    alert.severity === "success" ? "rgb(0, 172, 0)" : "crimson";

  const style = {
    backgroundColor,
    top: "10px",
  };

  useEffect(() => {
    if (alert.display) {
      setTimeout(() => {
        dispatch(hideMessage({ ...alert, display: false }));
      }, alert.duration);
    }
  }, [alert, dispatch]);

  return (
    <div
      data-testid="alert"
      style={alert.display ? style : {}}
      className="alert"
    >
      {alert.message}
    </div>
  );
};

export default Alert;
