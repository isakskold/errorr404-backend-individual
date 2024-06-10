import { Router } from "express";
import { aboutInfo } from "../../config/about.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";

const aboutRouter = Router();

//GET about page
aboutRouter.get("/", bodyContentBlocker, (req, res) => {
  res.json(aboutInfo);
});

export default aboutRouter;
