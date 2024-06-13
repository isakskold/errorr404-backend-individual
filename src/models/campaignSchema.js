import Joi from "joi";

const campaignSchema = Joi.object({
  campaignProducts: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().messages({
          "string.base": "Each product ID must be a string",
          "any.required": "Product ID is required",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Each quantity value must be a positive integer",
          "number.integer": "Each quantity value must be a positive integer",
          "number.min": "Each quantity value must be a positive integer",
          "any.required": "Quantity value is required",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "At least one product is required in the campaign",
    }),

  description: Joi.string().min(20).required().messages({
    "any.required": "Description must be atleast 20 string characters.",
  }),

  discount: Joi.number().required().messages({
    "number.base": '"discount" must be a number',
    "any.required": '"discount" is required',
  }),
}).options({ allowUnknown: false });

export default campaignSchema;
