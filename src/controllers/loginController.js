import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { findCustomerByEmail } from "../services/customers.js";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";
import CustomError from "../utils/customError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

// Controller function for user login
export const loginController = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the customer by email
  const customer = await findCustomerByEmail(email);

  if (!customer) {
    throw new CustomError("Invalid email", 401);
  }

  // Check if the password matches
  if (customer.password === password) {
    const loggedInCustomer = await findLoggedInCustomer();

    if (loggedInCustomer && loggedInCustomer.email === customer.email) {
      throw new CustomError(
        `${loggedInCustomer.email} is already logged in.`,
        401
      );
    }

    // If another customer is logged in, set their loggedIn status to false
    await updateCustomerLoggedInStatus(loggedInCustomer._id, false);

    // Update the loggedIn status to true and get the updated customer
    await updateCustomerLoggedInStatus(customer._id, true);

    return res.status(200).json({
      status: "success",
      message: `Customer logged in, welcome ${customer.firstName}`,
    });
  } else {
    throw new CustomError("Invalid password", 401);
  }
});
