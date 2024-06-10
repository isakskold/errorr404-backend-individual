import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { orderHistoryDb } from "../services/orderHistory.js";
import CustomError from "../utils/customError.js";

export const getOrderHistory = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const id = loggedInCustomer._id;
  const orderHistory = await orderHistoryDb.findOne({ userId: id });
  if (!orderHistory) {
    throw new CustomError("Order history not found", 404);
  }
  return res.status(200).json({
    status: "Success",
    message: "Order history found",
    data: orderHistory,
  });
});

export const getAllOrderHistoriesHandler = asyncErrorHandler(
  async (req, res, next) => {
    const orderHistories = await orderHistoryDb.find({});
    if (orderHistories.length === 0) {
      throw new CustomError("No order histories found", 404);
    }
    return res.status(200).json({
      status: "Success",
      message: "All order histories found",
      data: orderHistories,
    });
  }
);
