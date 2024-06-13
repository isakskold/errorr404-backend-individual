import Joi from "joi";

const productSchema = Joi.object({
  _id: Joi.string()
    .pattern(/^[a-fA-F0-9]{16}$/)
    .messages({
      "string.base": '"_id" should be a type of text',
      "string.empty": '"_id" cannot be an empty field',
      "string.pattern.base":
        '"_id" should be a 16-character hexadecimal string',
    })
    .optional(),
  title: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": '"title" should be a type of text',
      "string.empty": '"title" cannot be an empty field',
      "string.min": '"title" should have a minimum length of 2 characters',
      "string.max": '"title" should have a maximum length of 50 characters',
      "string.pattern.base": '"title" should only contain letters and spaces',
      "any.required": '"title" is a required field',
    }),
  desc: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s.,!?]+$/)
    .min(10)
    .max(200)
    .required()
    .messages({
      "string.base": '"desc" should be a type of text',
      "string.empty": '"desc" cannot be an empty field',
      "string.min": '"desc" should have a minimum length of 10 characters',
      "string.max": '"desc" should have a maximum length of 200 characters',
      "string.pattern.base":
        '"desc" should only contain letters, spaces, and punctuation',
      "any.required": '"desc" is a required field',
    }),
  price: Joi.number().integer().positive().required().messages({
    "number.base": '"price" should be a type of number',
    "number.positive": '"price" should be a positive number',
    "any.required": '"price" is a required field',
  }),
}).options({ allowUnknown: false }); // Disallow unknown properties

export default productSchema;
