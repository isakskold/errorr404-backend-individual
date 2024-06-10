// src/utils/asyncErrorHandler.js
export const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    const result = func(req, res, next);
    if (result instanceof Promise) {
      result.catch((err) => next(err));
    } else {
      // Log a warning or handle the case where func is not returning a promise
      console.warn("The func argument is not returning a promise.");
      // You may choose to handle this case differently based on your application logic
    }
  };
};
