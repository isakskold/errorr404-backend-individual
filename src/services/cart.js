import { applyCampaignOffers } from "./campaignOffers.js";
import CustomError from "../utils/customError.js";

export const carts = {}; // Object to store carts for each customer

// Function to calculate total price of items in the cart including campaign discounts
export const calculateTotalPrice = async (cart) => {
  try {
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    console.log(`Total price before discounts: ${totalPrice}`);

    // Apply campaign discounts
    totalPrice = await applyCampaignOffers(cart, totalPrice);
    console.log(`Total price after discounts: ${totalPrice}`);

    // Ensure total price is not negative
    if (totalPrice < 0) {
      totalPrice = 0;
    }

    return totalPrice;
  } catch (error) {
    console.error("Error calculating total price with campaign offers:", error);
    throw new CustomError(
      "Failed to calculate total price with campaign offers",
      500
    );
  }
};

// Find or create cart
export const getCart = (customerId) => {
  if (!carts[customerId]) {
    carts[customerId] = [];
  }
  return carts[customerId];
};
