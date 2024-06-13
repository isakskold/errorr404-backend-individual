export default (error, req, res, next) => {
  if (error.isOperational) {
    // Operational error, handle gracefully
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message,
    });
  } else {
    // Programming error, log and respond with generic message
    console.error("PROGRAMMING ERROR:", error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
