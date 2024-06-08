import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

export async function preventAdmin(req, res, next) {
  const loggedInCustomer = await findLoggedInCustomer();

  if (loggedInCustomer._id === "admin") {
    return res.status(400).json({
      message: "Admin can't do this. Manually update database instead.",
    });
  }
  next();
}
