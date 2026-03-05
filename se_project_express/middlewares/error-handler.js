module.exports = (err, req, res, next) => {
  // Enhanced error logging for debugging
  console.error("Error details:", {
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
    name: err.name,
    errors: err.errors,
    joi: err.joi,
    details: err.details,
    body: req.body,
    url: req.originalUrl,
    method: req.method,
  });
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({ message });
};
