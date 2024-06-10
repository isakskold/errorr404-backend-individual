import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { preventGuest } from "../middleware/preventGuest.js";

const logoutRouter = Router();

// POST route for user login
logoutRouter.post("/", preventGuest, bodyContentBlocker, logoutController);

export default logoutRouter;
