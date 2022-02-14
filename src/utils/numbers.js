export const formatCurrency = (num) => {
  return `£${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};

export const basketTotal = (basket) => {
  return (
    basket.reduce(
      (total, value) => total + value.price * 100 * value.quantity,
      0
    ) / 100
  );
};

export const basketItems = (basket) => {
  return basket.reduce((total, value) => total + value.quantity, 0);
};
