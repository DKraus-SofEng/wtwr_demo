const router = require("express").Router();
const {
  login,
  createUser,
  getCurrentUser,
  updateCurrentUser,
  updateAvatar,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");
const {
  validateUsersBody,
  validateSigninBody,
  validateUpdateUserBody,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.post("/signin", validateSigninBody, login);
router.post("/signup", validateUsersBody, createUser);
router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUserBody, updateCurrentUser);

// Update avatar using a URL in the request body
router.patch("/me/avatar", auth, updateAvatar);

module.exports = router;
