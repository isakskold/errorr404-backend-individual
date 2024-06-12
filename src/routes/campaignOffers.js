import { Router } from "express";
import { validateCampaign } from "../middleware/campaignValidation.js";
import { addCampaignOffer } from "../controllers/campaignOfferController.js";

const campaignRouter = Router();

//GET all
//campaignRouter.get("/");

//GET specific
//campaignRouter.get("/:campaignId");

//POST new
campaignRouter.post("/", validateCampaign, addCampaignOffer);

//PUT existing
//campaignRouter.put("/:campaignId");

//DELETE existing
//campaignRouter.delete("/:campaignId");

export default campaignRouter;
