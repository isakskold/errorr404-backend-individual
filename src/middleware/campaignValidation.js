import campaignSchema from "../models/campaignSchema.js";

export function validateCampaign(req, res, next) {
  const { error } = campaignSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => detail.message),
    });
  }

  console.log("Validation successful");
  next();
}
