import nedb from "nedb-promises";
import CustomError from "../utils/customError.js";

const orderHistoryDb = new nedb({
  filename: "orderHistory.db",
  autoload: true,
});

// Function to create or update order history
async function createOrUpdateOrderHistory(orderHistoryData) {
  try {
    const existingOrderHistory = await orderHistoryDb.findOne({
      userId: orderHistoryData.userId,
    });

    if (existingOrderHistory) {
      // Update the existing order history
      existingOrderHistory.orders.push(orderHistoryData.orders[0]);
      existingOrderHistory.totalPrice += orderHistoryData.totalPrice;
      existingOrderHistory.firstName = orderHistoryData.firstName; // Ensure firstName is updated

      await orderHistoryDb.update(
        { userId: orderHistoryData.userId },
        existingOrderHistory
      );
    } else {
      // Insert new order history
      await orderHistoryDb.insert({
        userId: orderHistoryData.userId,
        firstName: orderHistoryData.firstName,
        totalPrice: orderHistoryData.totalPrice,
        orders: orderHistoryData.orders,
      });
    }
  } catch (error) {
    throw new CustomError("Failed to create or update order history", 500);
  }
}

export { createOrUpdateOrderHistory, orderHistoryDb };
