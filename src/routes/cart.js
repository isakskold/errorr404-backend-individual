import { Router } from "express";
import { getProductById } from "../services/product.js";

const router = Router({ mergeParams: true });
const carts = {}; // Object to store carts for each customer

// Calculate total price of items in the cart
const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price, 0);
};

// Get the cart for a specific customer
const getCart = (customerId) => {
  if (!carts[customerId]) {
    carts[customerId] = [];
  }
  return carts[customerId];
};

router.get("/", (req, res, next) => {
  const customerId = req.params.id;
  const cart = getCart(customerId);

  if (cart.length === 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Din varukorg är tom",
    });
  }

  const totalPrice = calculateTotalPrice(cart);

  res.status(200).json({
    success: true,
    status: 200,
    data: {
      cart,
      totalPrice,
    },
  });
});

router.post("/:productId", async (req, res, next) => {
  const customerId = req.params.id;
  const productId = parseInt(req.params.productId, 10);
  try {
    const foundItem = await getProductById(productId);

    if (!foundItem) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Produkten du försöker lägga till existerar inte.",
      });
    }

    const cart = getCart(customerId);
    cart.push(foundItem);

    const totalPrice = calculateTotalPrice(cart);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Produkt tillagd i varukorgen",
      data: {
        cart,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", (req, res, next) => {
  const customerId = req.params.id;
  const productId = parseInt(req.params.productId, 10);
  const cart = getCart(customerId);
  const foundItemIndex = cart.findIndex((item) => item.id === productId);

  if (foundItemIndex === -1) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Produkten du försöker ta bort finns inte i varukorgen",
    });
  }

  cart.splice(foundItemIndex, 1);

  const totalPrice = calculateTotalPrice(cart);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Produkt borttagen från varukorgen",
    data: {
      cart,
      totalPrice,
    },
  });
});

export default router;
export { getCart }; // Ensure getCart is exported
