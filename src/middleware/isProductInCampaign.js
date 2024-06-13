import { campaignDatabase } from "../services/campaignOffers.js";
import CustomError from "../utils/customError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

export const isProductInCampaign = asyncErrorHandler(async (req, res, next) => {
  const campaign = await campaignDatabase.findOne({});
  const productId = req.params.id;

  // Check if the product ID exists in campaignProducts
  const isPartOfCampaign = campaign.campaignProducts.some(
    (product) => product.productId === productId
  );

  if (isPartOfCampaign) {
    // Product is part of the campaign, forbid deletion or update
    throw new CustomError(
      "Cannot delete or update product. It is part of the current campaign.",
      403
    );
  }
  next();
});
