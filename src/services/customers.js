import nedb from "nedb-promises";
import CustomError from "../utils/customError.js";

export const database = new nedb({ filename: "customers.db", autoload: true });

const defaultAdmin = {
  firstName: "admin",
  email: "admin@admin.com",
  password: "admin1",
  loggedIn: false,
  _id: "admin",
};

const defaultGuest = {
  firstName: "Guest",
  loggedIn: true,
  _id: "guestintest",
};

// Initialize database with default guest and admin
export const initializeCustomerDatabase = async () => {
  try {
    const existingCustomers = await database.find({});
    if (existingCustomers.length === 0) {
      await database.insert(defaultGuest);
      await database.insert(defaultAdmin);
    }
  } catch (error) {
    console.error("Failed to initialize customer database:", error);
    throw new CustomError("Internal Server Error", 500);
  }
};

// Function to find a customer by email
export const findCustomerByEmail = async (email) => {
  const customer = await database.findOne({ email });

  return customer;
};

// Function to find a customer by phone number
export const findCustomerByPhoneNumber = async (phoneNumber) => {
  const customer = await database.findOne({ phoneNumber });

  return customer;
};
