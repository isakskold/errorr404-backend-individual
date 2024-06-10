import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

// Controller function for user logout
export const logoutController = asyncErrorHandler(async (req, res) => {
  // Find the customer by ID
  const customer = await findLoggedInCustomer();

  // Update the loggedIn status to false
  await updateCustomerLoggedInStatus(customer._id, false);

  // Automatically log in the guest user
  await updateCustomerLoggedInStatus("guestintest", true);

  return res.status(200).json({
    status: "success",
    message: `${customer.firstName} logged out`,
  });
});
