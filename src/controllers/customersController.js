import { database } from "../services/customers.js";
import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";
import { updateCustomerLoggedInStatus } from "../utils/updateLoggedInStatus.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

// Function to create a new customer
export const createCustomer = asyncErrorHandler(async (req, res, next) => {
  const customerData = req.body;
  const customerDataWithLoggedIn = { ...customerData, loggedIn: false };
  const newCustomer = await database.insert(customerDataWithLoggedIn);

  return res.status(201).json({
    status: "success",
    message: `Customer created. Welcome ${customerData.firstName}`,
    data: {
      newCustomer,
    },
  });
});

// Function to get all customers
export const getAllCustomers = asyncErrorHandler(async (req, res, next) => {
  const customers = await database.find({});

  return res.status(200).json({
    status: "success",
    message: "All customers retrieved",
    data: {
      customers,
    },
  });
});

// Function to update a customer
export const updateCustomer = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();
  const customerId = loggedInCustomer._id;
  const updatedCustomerData = req.body;
  await database.update({ _id: customerId }, { $set: updatedCustomerData });

  return res.status(200).json({
    status: "Success",
    message: `${loggedInCustomer.firstName}, your profile has been updated`,
    data: {
      updatedCustomerData,
    },
  });
  next();
});

//Customer profile
export const findCustomerProfile = asyncErrorHandler(async (req, res, next) => {
  const customer = await findLoggedInCustomer();

  return res.status(200).json({
    status: "success",
    message: `This is your profile ${customer.firstName}`,
    data: {
      customer,
    },
  });
});

// Function to delete a customer
export const deleteCustomer = asyncErrorHandler(async (req, res, next) => {
  const loggedInCustomer = await findLoggedInCustomer();

  await database.remove(loggedInCustomer);
  await updateCustomerLoggedInStatus("guestintest", true);

  return res.status(200).json({
    status: "Success",
    message: `Customer deleted, bye ${loggedInCustomer.firstName}`,
  });
  next();
});
