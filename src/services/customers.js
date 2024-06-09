import nedb from "nedb-promises";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../utils/responseHandler.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

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

// Initialize database with default guest
export async function initializeCustomerDatabase() {
  try {
    const existingCustomers = await database.find({});
    if (existingCustomers.length === 0) {
      await database.insert(defaultGuest);
      await database.insert(defaultAdmin);
    }
  } catch (error) {
    console.error(`Error initializing database: ${error.message}`);
    throw new Error("Failed to initialize database");
  }
}

// Function to create a new customer
export async function createCustomer(req, res) {
  try {
    const customerData = req.body;
    const customerDataWithLoggedIn = { ...customerData, loggedIn: false };
    const newCustomer = await database.insert(customerDataWithLoggedIn);
    const message = `Customer Created. Welcome ${newCustomer.firstName}`;

    return handleSuccessResponse(res, { customer: newCustomer }, message, 201);
  } catch (error) {
    return handleErrorResponse(
      res,
      "Failed to create customer",
      500,
      error.message
    );
  }
}

// Function to get all customers
export async function getAllCustomers(req, res) {
  try {
    const customers = await database.find({});
    if (customers.length === 0) {
      return handleErrorResponse(res, "No customers found", 404);
    }

    return handleSuccessResponse(
      res,
      { customers },
      "Customers retrieved successfully"
    );
  } catch (error) {
    return handleErrorResponse(
      res,
      "Failed to fetch customers",
      500,
      error.message
    );
  }
}

// Function to update a customer
export async function updateCustomer(req, res) {
  try {
    const loggedInCustomer = await findLoggedInCustomer();
    const customerId = loggedInCustomer._id;
    const updatedCustomerData = req.body;
    const customer = await database.findOne({ _id: customerId });

    if (!customer) {
      return handleErrorResponse(res, "Customer not found", 404);
    }

    await database.update({ _id: customerId }, { $set: updatedCustomerData });
    return handleSuccessResponse(res, {}, "Customer updated successfully");
  } catch (error) {
    return handleErrorResponse(
      res,
      "Failed to update customer",
      500,
      error.message
    );
  }
}

// Function to delete a customer
export async function deleteCustomer(req, res) {
  try {
    const loggedInCustomer = await findLoggedInCustomer();
    const customerId = loggedInCustomer._id;

    await database.remove({ _id: customerId });
    await updateCustomerLoggedInStatus("guestintest", true);

    return handleSuccessResponse(
      res,
      {},
      `Customer deleted successfully. Bye ${loggedInCustomer.firstName}`
    );
  } catch (error) {
    return handleErrorResponse(
      res,
      "Failed to delete customer",
      500,
      error.message
    );
  }
}

//Customer profile
export async function findCustomerProfile(req, res) {
  try {
    const customer = await findLoggedInCustomer();
    return handleSuccessResponse(res, { customer }, "Profile found");
  } catch (error) {
    return handleErrorResponse(
      res,
      "Failed to find customer profile",
      500,
      error.message
    );
  }
}

// Function to find a customer by email
export async function findCustomerByEmail(email) {
  try {
    const customer = await database.findOne({ email });
    return customer;
  } catch (error) {
    throw new Error("Failed to find customer by email");
  }
}

// Function to find a customer by phone number
export async function findCustomerByPhoneNumber(phoneNumber) {
  try {
    const customer = await database.findOne({ phoneNumber });
    return customer;
  } catch (error) {
    throw new Error("Failed to find customer by phone number");
  }
}
