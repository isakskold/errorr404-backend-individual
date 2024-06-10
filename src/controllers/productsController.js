import { getFormattedDateTime } from "../utils/date.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import { database } from "../services/product.js";

// Add new menu item
export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = req.body;
  product.createdAt = getFormattedDateTime();

  const newProduct = await database.insert(product);
  return res.status(201).json({
    status: "Success",
    message: "Product created",
    data: newProduct,
  });
});

// Get all menu items
export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await database.find({});
  return res.status(200).json({
    status: "Success",
    message: "All products found",
    data: products,
  });
});

// Get specific menu item
export const getProductById = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await database.findOne({ _id: id });

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  return res.status(200).json({
    status: "Success",
    message: "Product found",
    data: product,
  });
});

// Update menu item
export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  updatedProduct.modifiedAt = getFormattedDateTime();

  const product = await database.findOne({ _id: id });

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  await database.update({ _id: product._id }, { $set: updatedProduct });

  const updatedProductData = await database.findOne({ _id: id });

  return res.status(200).json({
    status: "Success",
    message: `${product.title} has been updated`,
    data: updatedProductData,
  });
});

// Delete menu item
export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const deletedProduct = await database.remove({ _id: id });

  if (deletedProduct === 0) {
    throw new CustomError("Product not found", 404);
  }

  const updatedDatabase = await database.find({});

  return res.status(200).json({
    status: "Success",
    message: "Menu item deleted successfully",
    updatedMenu: updatedDatabase,
  });
});
