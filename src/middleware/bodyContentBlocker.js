//Stops request if a request contains body content when it should not

import CustomError from "../utils/customError.js";

export const bodyContentBlocker = (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    throw new CustomError("No body content allowed in request", 403);
  }
  next();
};
