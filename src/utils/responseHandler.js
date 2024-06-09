export function handleSuccessResponse(res, data, message, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
    statusCode,
  });
}

export function handleErrorResponse(
  res,
  message,
  statusCode = 500,
  error = null
) {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
    statusCode,
  });
}
