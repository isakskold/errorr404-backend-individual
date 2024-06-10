import { calculateTotalPrice, getCart } from "../services/cart.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { getProductById } from "../services/product.js";
import CustomError from "../utils/customError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

export const customerCart = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const cart = getCart(customerId);

  if (cart.length === 0) {
    return res.json({
      message: "Din varukorg är tom",
    });
  }

  const totalPrice = calculateTotalPrice(cart);
  console.log(totalPrice);

  return res.status(200).json({
    status: "success",
    message: "Customer cart",
    totalPrice: totalPrice,
    data: {
      cart,
    },
  });
  next();
});

export const addToCart = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const productId = req.params.productId;

  const foundItem = await getProductById(productId);
  if (!foundItem) {
    throw new CustomError("Product not found", 404);
  }

  const cart = getCart(customerId);
  cart.push(foundItem);
  const totalPrice = calculateTotalPrice(cart);

  return res.status(200).json({
    status: "sucess",
    message: "Product added to cart",
    data: {
      totalPrice: totalPrice,
      cart,
    },
  });
  next();
});

export const deleteFromCart = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const productId = req.params.productId;
  const cart = getCart(customerId);
  const foundItemIndex = cart.findIndex((item) => item._id === productId);

  if (foundItemIndex === -1) {
    throw new CustomError("Product not found", 404);
  }

  cart.splice(foundItemIndex, 1);

  const totalPrice = calculateTotalPrice(cart);

  return res.status(200).json({
    status: "success",
    message: "Produkt borttagen från varukorgen",
    data: {
      cart,
      totalPrice,
    },
  });
  next();
});
