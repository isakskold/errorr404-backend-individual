import { loginCustomer } from "../services/login.js";

// Controller function for user login
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // Log in the new customer
    const { success, message, customer } = await loginCustomer(email, password);

    // Return success or error response based on the success flag
    if (success) {
      return res.status(200).json({ message, customer });
    } else {
      return res.status(400).json({ message });
    }
  } catch (error) {
    // If an unexpected error occurs, return a generic error response
    return res.status(500).json({ message: error.message });
  }
}
