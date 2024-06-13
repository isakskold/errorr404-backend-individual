import CustomError from "./customError.js";

export const asyncErrorHandler = (func) => {
  return async (req, res, next) => {
    try {
      const result = func(req, res, next);
      if (result instanceof Promise) {
        await result;
      } else {
        // Log a warning or handle the case where func is not returning a promise
        console.warn("The func argument is not returning a promise.");
        // You may choose to handle this case differently based on your application logic
      }
    } catch (error) {
      if (error instanceof CustomError) {
        //Operational error
        console.error("Operational Error: ", error);
        next(error);
      } else {
        // Programming error
        const programmingError = new Error(error.message);
        programmingError.statusCode = 500; // Default status code for programming errors
        programmingError.status = "error";
        programmingError.isOperational = false; // This is not an operational error
        console.error("Programming Error:", programmingError);
        next(programmingError);
      }
    }
  };
};
