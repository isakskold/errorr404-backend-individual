import {
  getAllOrderHistories,
  getOrderHistoryById,
} from "../services/orderHistory.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

export const getOrderHistory = asyncErrorHandler(async (req, res) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const id = loggedInCustomer._id;
  try {
    const orderHistory = await getOrderHistoryById(id);
    return res.status(200).json(orderHistory);
  } catch (error) {
    return res.status(404).json({ message: "Order History not found" });
  }
});

export const getAllOrderHistoriesHandler = asyncErrorHandler(
  async (req, res) => {
    try {
      const orderHistories = await getAllOrderHistories();
      return res.status(200).json(orderHistories);
    } catch (error) {
      return res.status(404).json({ message: "No order histories found" });
    }
  }
);
