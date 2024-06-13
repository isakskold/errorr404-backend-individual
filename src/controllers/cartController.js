import { calculateTotalPrice, getCart } from "../services/cart.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import CustomError from "../utils/customError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { findProductById } from "../services/product.js";

// Helper function to create the data object
const createResponseData = (status, message, totalPrice, discount, cart) => ({
  status,
  message,
  totalPrice,
  discount,
  data: { cart },
});

export const customerCart = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const cart = getCart(customerId);

  if (cart.length === 0) {
    return res.json({
      message: "Your cart is empty",
    });
  }

  const { totalPrice, discount } = await calculateTotalPrice(cart);

  console.log("Total Price: ", totalPrice);
  console.log("Discount: ", discount);

  const data = createResponseData(
    "success",
    "Customer cart",
    totalPrice,
    discount,
    cart
  );

  return res.status(200).json(data);
});

export const addToCart = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const productId = req.params.productId;

  const foundItem = await findProductById(productId);
  if (!foundItem) {
    throw new CustomError("Product not found", 404);
  }

  const cart = getCart(customerId);
  cart.push(foundItem);
  const { totalPrice, discount } = await calculateTotalPrice(cart);

  const data = createResponseData(
    "success",
    "Product added to cart",
    totalPrice,
    discount,
    cart
  );

  return res.status(200).json(data);
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

  const { totalPrice, discount } = await calculateTotalPrice(cart);

  const data = createResponseData(
    "success",
    "Product removed from cart",
    totalPrice,
    discount,
    cart
  );

  return res.status(200).json(data);
});
