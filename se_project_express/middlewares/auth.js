const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  // console.log("AUTH CHECK:", req.path);
  // get authorization from the header
  const { authorization } = req.headers;
  // check if the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  // get token
  const token = authorization.replace("Bearer ", "");

  // verify token
  let payload;
  try {
    // trying to verify  token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }

  // attach payload to request
  req.user = payload;
  next();
  return undefined;
};
