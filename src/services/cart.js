import { applyCampaignOffers } from "./campaignOffers.js";
import CustomError from "../utils/customError.js";

export const carts = {}; // Object to store carts for each customer

// Function to calculate total price of items in the cart including campaign discounts
export const calculateTotalPrice = async (cart) => {
  try {
    const totalPriceBeforeDiscount = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );
    console.log(`Total price before discounts: ${totalPriceBeforeDiscount}`);

    // Apply campaign discounts and get the total price and discount
    const { totalPrice: finalPrice, discount } = await applyCampaignOffers(
      cart,
      totalPriceBeforeDiscount
    );
    console.log(`Total price after discounts: ${finalPrice}`);

    // Ensure total price is not negative
    const totalPrice = Math.max(finalPrice, 0);

    return { totalPrice, discount };
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
