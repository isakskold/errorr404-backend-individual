import express from "express";
import { createOrder, getOrderById } from "../controllers/ordersController.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";

const ordersRouter = express.Router({ mergeParams: true });

// Place order
ordersRouter.post("/", bodyContentBlocker, createOrder);

// See specific order
ordersRouter.get("/:orderId", bodyContentBlocker, getOrderById);

export default ordersRouter;
