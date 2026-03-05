const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./errors");

function handleError(res, err) {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: "Resource not found" });
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
}

module.exports = handleError;
