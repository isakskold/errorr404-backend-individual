import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import { campaignDatabase } from "../services/campaignOffers.js";
import { database as productDatabase } from "../services/product.js";

// Controller to add a new campaign offer
export const addCampaignOffer = asyncErrorHandler(async (req, res, next) => {
  // Check if campaignDatabase is not empty
  const existingCampaigns = await campaignDatabase.find({});
  if (existingCampaigns.length > 0) {
    throw new CustomError(
      "Campaign offer already exists, cannot add another",
      403
    );
  }

  const { campaignProducts, description, discount } = req.body;

  // Check if all product IDs in the request body exist in the product database
  const productIds = campaignProducts.map((product) => product.productId);
  console.log(`Product IDs: ${productIds}`);
  const foundProducts = await productDatabase.find({
    _id: { $in: productIds },
  });
  console.log(`Found products: ${JSON.stringify(foundProducts, null, 2)}`);

  if (foundProducts.length !== productIds.length) {
    // Find the missing product IDs
    const foundProductIds = foundProducts.map((product) => product._id);
    console.log(`Found products IDs: ${foundProductIds}`);

    const missingProductIds = productIds.filter(
      (id) => !foundProductIds.includes(id)
    );
    console.log(`Missing product IDs: ${missingProductIds}`);

    throw new CustomError(
      `The following product IDs do not exist: ${missingProductIds.join(", ")}`,
      400
    );
  }

  // Construct the new campaign offer with product titles
  const newCampaignOffer = {
    campaignProducts: campaignProducts.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      title: foundProducts.find((p) => p._id === product.productId).title,
      price: foundProducts.find((p) => p._id === product.productId).price,
    })),
    description,
    discount,
  };

  await campaignDatabase.insert(newCampaignOffer);

  return res.status(201).json({
    status: "success",
    message: "Campaign offer created successfully",
    campaignOffer: newCampaignOffer,
  });
});

export const deleteCampaignOffer = asyncErrorHandler(async (req, res, next) => {
  // Check if campaignDatabase is empty
  let existingCampaigns = await campaignDatabase.find({});
  if (existingCampaigns.length === 0) {
    throw new CustomError("No campaign to delete", 404);
  }

  await campaignDatabase.remove({});
  existingCampaigns = await campaignDatabase.find({});

  return res.status(200).json({
    status: "Success",
    message: "Campaign offer deleted successfully.",
    data: existingCampaigns,
  });
});
