import express from "express";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
} from "../controllers/orderHistoryController.js";
import { preventGuest } from "../middleware/preventGuest.js";
import { validateAdmin } from "../middleware/adminValidation.js";

const orderHistoryRouter = express.Router();

// GET all order histories
orderHistoryRouter.get(
  "/all",
  validateAdmin,
  bodyContentBlocker,
  getAllOrderHistoriesHandler
);

// GET order history
orderHistoryRouter.get("/", preventGuest, bodyContentBlocker, getOrderHistory);

export default orderHistoryRouter;
