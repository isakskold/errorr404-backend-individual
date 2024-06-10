import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { validateProduct } from "../middleware/productValidation.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { validateAdmin } from "../middleware/adminValidation.js";

const productRouter = Router();

// URL for CRUD operations: localhost:3000/api/products

// GET all menu items
productRouter.get("/", bodyContentBlocker, getAllProducts);

// POST new menu item
productRouter.post("/", validateAdmin, validateProduct, createProduct);

// GET specific menu item by _id
productRouter.get("/:id", bodyContentBlocker, getProductById);

// UPDATE menu item by _id
productRouter.put("/:id", validateAdmin, validateProduct, updateProduct);

// DELETE menu item by _id
productRouter.delete("/:id", validateAdmin, bodyContentBlocker, deleteProduct);

export default productRouter;
