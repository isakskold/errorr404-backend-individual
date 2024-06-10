import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";

export const validateAdmin = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();

  if (loggedInCustomer._id !== "admin") {
    throw new CustomError("Admin authorization denied", 400);
  }
  next();
});
