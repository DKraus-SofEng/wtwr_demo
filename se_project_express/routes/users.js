const router = require("express").Router();
const {
  login,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");
const {
  validateUsersBody,
  validateSigninBody,
  validateUpdateUserBody,
} = require("../middlewares/validation");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { updateAvatar } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", validateSigninBody, login);
router.post("/signup", validateUsersBody, createUser);
router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUserBody, updateCurrentUser);
router.post("/me/avatar", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
