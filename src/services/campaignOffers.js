import nedb from "nedb-promises";
import CustomError from "../utils/customError.js";

export const campaignDatabase = new nedb({
  filename: "campaignOffers.db",
  autoload: true,
});

// Function to fetch the campaign offer
export const getCampaignOffer = async () => {
  try {
    const campaigns = await campaignDatabase.find({});
    if (campaigns.length === 0) {
      throw new CustomError("No campaign offers found", 404);
    }
    return campaigns[0]; // Assuming only one campaign exists in the database
  } catch (error) {
    console.error("Error fetching campaign offers:", error);
    throw new CustomError("Failed to fetch campaign offers", 500);
  }
};

// Function to apply campaign offers to cart total price
export const applyCampaignOffers = async (cart, totalPrice) => {
  try {
    const campaign = await getCampaignOffer();

    // Create a map to track the quantity of each product in the cart
    const cartProductQuantities = cart.reduce((acc, item) => {
      acc[item._id] = (acc[item._id] || 0) + 1;
      return acc;
    }, {});

    // Check if all campaign products are in the cart with required quantities
    const allProductsInCart = campaign.campaignProducts.every(
      (campaignProduct) => {
        const cartQuantity =
          cartProductQuantities[campaignProduct.productId] || 0;
        return cartQuantity >= campaignProduct.quantity;
      }
    );

    let discount = 0;

    // Apply discount if all products are in the cart with required quantities
    if (allProductsInCart) {
      discount = campaign.discount;
      console.log(`Applying discount of ${discount}`);
      totalPrice -= discount;
    }

    // Ensure total price is not negative
    if (totalPrice < 0) {
      totalPrice = 0;
    }
    return { totalPrice, discount };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    console.error("Error applying campaign offers:", error);
    throw new CustomError("Failed to apply campaign offers", 500);
  }
};
