import { Router } from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  customerCart,
  addToCart,
  deleteFromCart,
} from "../controllers/cartController.js";

const cartRouter = Router();

// GET cart
cartRouter.get("/", bodyContentBlocker, customerCart);

//POST add product to cart
cartRouter.post("/:productId", bodyContentBlocker, addToCart);

//DELETE delete product from cart
cartRouter.delete("/:productId", bodyContentBlocker, deleteFromCart);

export default cartRouter;
