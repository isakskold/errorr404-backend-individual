// routes/customers.js
import { Router } from "express";
import { validateCustomer } from "../middleware/customersValidation.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  findCustomerProfile,
} from "../services/customers.js";
import { preventGuest } from "../middleware/preventGuest.js";
import { validateAdmin } from "../middleware/adminValidation.js";
import { preventAdmin } from "../middleware/preventAdmin.js";

const router = Router();

// URL for CRUD operations: localhost:3000/api/customers

// POST route for adding a new customer
router.post("/", validateCustomer, createCustomer);

// GET route for fetching all customers
router.get("/", validateAdmin, bodyContentBlocker, getAllCustomers);

// GET route for customer profile
router.get("/profile", bodyContentBlocker, findCustomerProfile);

// PUT route for updating customer info
router.put("/", preventGuest, preventAdmin, validateCustomer, updateCustomer);

// DELETE route for deleting customer
router.delete(
  "/",
  preventGuest,
  preventAdmin,
  bodyContentBlocker,
  deleteCustomer
);

export default router;
