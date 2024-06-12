import express from "express";
import cors from "cors";

import { campaignDatabase } from "./src/services/campaignOffers.js"; //Import initializes database
import { initializeDatabase } from "./src/services/product.js"; //product database
import { initializeCustomerDatabase } from "./src/services/customers.js";
import CustomError from "./src/utils/customError.js";
import globalErrorHandler from "./src/controllers/errorController.js";

import cartRouter from "./src/routes/cart.js";
import aboutRouter from "./src/routes/about.js";
import loginRouter from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import ordersRouter from "./src/routes/orders.js";
import orderHistoryRouter from "./src/routes/orderHistory.js";
import customerRouter from "./src/routes/customers.js";
import productRouter from "./src/routes/products.js";
import campaignRouter from "./src/routes/campaignOffers.js";

import {
  logAbout,
  logCampaignOffer,
  logCartParam,
  logCustomer,
  logLogin,
  logLogout,
  logOrderHistory,
  logOrdersParam,
  logProducts,
} from "./src/middleware/routeConsoleLogs.js";

import { validateAdmin } from "./src/middleware/adminValidation.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/customers", logCustomer, customerRouter);
app.use("/login", logLogin, loginRouter);
app.use("/logout", logLogout, logoutRouter);
app.use("/about", logAbout, aboutRouter);
app.use("/products", logProducts, productRouter);
app.use("/cart", logCartParam, cartRouter);
app.use("/orders", logOrdersParam, ordersRouter);
app.use("/order-history", logOrderHistory, orderHistoryRouter);
app.use("/campaign-offers", logCampaignOffer, validateAdmin, campaignRouter);

//Default error for invalid routes
app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );

  next(err);
});

//Global error handling
app.use(globalErrorHandler);

// Initialize both databases with default data if empty, then start the server
const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => initializeCustomerDatabase())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the databases:", error);
    process.exit(1);
  });
