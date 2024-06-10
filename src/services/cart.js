export const carts = {}; // Object to store carts for each customer

// Calculate total price of items in the cart
export const calculateTotalPrice = (cart) => {
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cart.length >= 5) {
    total *= 0.8;
  } else if (cart.length >= 3) {
    total *= 0.9;
  }
  return total;
};

// Find or create cart
export const getCart = (customerId) => {
  if (!carts[customerId]) {
    carts[customerId] = [];
  }
  return carts[customerId];
};
