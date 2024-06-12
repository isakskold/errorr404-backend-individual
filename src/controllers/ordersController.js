import { createOrUpdateOrderHistory } from "../services/orderHistory.js";
import { orderHistoryDb } from "../services/orderHistory.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import CustomError from "../utils/customError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { calculateTotalPrice, getCart } from "../services/cart.js";

// Function to create a new order
export const createOrder = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const userId = loggedInCustomer._id;
  const cart = getCart(userId);
  const totalPrice = await calculateTotalPrice(cart);

  if (cart.length === 0) {
    throw new CustomError("Cart is empty", 400);
  }

  const customer = loggedInCustomer;

  const prelTime = new Date();
  const prelDelTime = new Date(prelTime.getTime() + 20 * 60000); // 20 minutes from placed order

  function formatDate(date) {
    // Get the components of the date
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // Format the date as desired
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const orderTime = formatDate(prelTime);
  const deliveryTime = formatDate(prelDelTime);

  const newOrder = {
    orderId: Math.floor(Math.random() * 1000000), //generate random orderId
    userId,
    items: [...cart],
    totalPrice: totalPrice,
    orderTime: orderTime,
    deliveryTime: deliveryTime,
  };

  const orderHistoryData = {
    userId,
    firstName: customer.firstName,
    totalPrice: totalPrice,
    orders: [newOrder],
  };

  await createOrUpdateOrderHistory(orderHistoryData);

  cart.length = 0; // Clear the cart

  return res.status(201).json({
    status: "success",
    message: "Order has been sent. Enter your order ID to see delivery time",
    orderId: newOrder.orderId,
  });
});

// Function to get order by ID
export const getOrderById = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const userId = loggedInCustomer._id;
  const orderId = req.params.orderId;

  const orderHistory = await orderHistoryDb.findOne({ userId: userId });
  if (!orderHistory) {
    throw new CustomError("Order history not found", 404);
  }

  const order = orderHistory.orders.find(
    (order) => order.orderId === parseInt(orderId, 10)
  );
  if (!order) {
    throw new CustomError("Order not found", 404);
  }

  return res.status(200).json({
    status: "success",
    message: "Order found",
    data: order,
  });
});
