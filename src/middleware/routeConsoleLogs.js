// loggingMiddleware.js
function routeLogger(message) {
  return function (req, res, next) {
    const logMessage = {
      message: message,
    };
    console.log(logMessage);
    next();
  };
}

export const logCartParam = routeLogger("Cart operation");
export const logOrdersParam = routeLogger("Order operation");
export const logOrderHistory = routeLogger("Order History operation");
export const logCustomer = routeLogger("Customer operation");
export const logAbout = routeLogger("About operation");
export const logCampaignOffer = routeLogger("Campaign offer operation");
export const logLogin = routeLogger("Login operation");
export const logLogout = routeLogger("Logout operation");
export const logProducts = routeLogger("Products operation");
export const logOrders = routeLogger("Orders operation");
