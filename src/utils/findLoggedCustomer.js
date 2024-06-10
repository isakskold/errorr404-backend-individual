import { database } from "../services/customers.js";
import CustomError from "./customError.js";

export async function findLoggedInCustomer() {
  try {
    const loggedInCustomer = database.findOne({ loggedIn: true });
    return loggedInCustomer;
  } catch (error) {
    throw new CustomError("Failed to find the logged-in customer", 500);
  }
}
