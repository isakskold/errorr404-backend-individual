import { findCustomerByEmail, getAllCustomers } from "./customers.js";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

// Function to handle user login
export async function loginCustomer(email, password) {
  // Find the customer by email
  const customer = await findCustomerByEmail(email);

  if (!customer) {
    return { success: false, message: "Invalid email" };
  }

  // Check if the password matches
  if (customer.password === password) {
    const loggedInCustomer = await findLoggedInCustomer();

    if (loggedInCustomer && loggedInCustomer.email === customer.email) {
      return {
        success: false,
        message: `${loggedInCustomer.email} is already logged in.`,
      };
    }

    // If another customer is logged in, set their loggedIn status to false
    if (loggedInCustomer) {
      await updateCustomerLoggedInStatus(loggedInCustomer._id, false);
    }
    // Update the loggedIn status to true and get the updated customer
    const updatedCustomer = await updateCustomerLoggedInStatus(
      customer._id,
      true
    );
    return {
      success: true,
      message: "Login successful",
      customer: updatedCustomer,
    };
  } else {
    return { success: false, message: "Invalid password" };
  }
}
