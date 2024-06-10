// routes/customers.js
import { Router } from "express";

import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  findCustomerProfile,
} from "../controllers/customersController.js";

import { validateCustomer } from "../middleware/customersValidation.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { preventGuest } from "../middleware/preventGuest.js";
import { validateAdmin } from "../middleware/adminValidation.js";
import { preventAdmin } from "../middleware/preventAdmin.js";

const customerRouter = Router();

// POST route for adding a new customer
customerRouter.post("/", validateCustomer, createCustomer);

// GET route for fetching all customers
customerRouter.get("/", validateAdmin, bodyContentBlocker, getAllCustomers);

// GET route for customer profile
customerRouter.get("/profile", bodyContentBlocker, findCustomerProfile);

// PUT route for updating customer info
customerRouter.put(
  "/",

  preventGuest,
  preventAdmin,
  validateCustomer,
  updateCustomer
);

// DELETE route for deleting customer
customerRouter.delete(
  "/",

  preventGuest,
  preventAdmin,
  bodyContentBlocker,
  deleteCustomer
);

export default customerRouter;
