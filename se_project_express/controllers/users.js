/* eslint-disable consistent-return */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require(`../utils/errors`);
const { JWT_SECRET } = require("../utils/config");

// GET CURRENT USER
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        // Invalid user ID format
        return next(
          new BadRequestError("The id string is in an invalid format")
        );
      }
      if (err.name === "DocumentNotFoundError") {
        // User not found
        return next(new NotFoundError("User not found"));
      }
      if (err.code === 11000) {
        // Duplicate email
        return next(new ConflictError("Email already exists"));
      }
      return next(err);
    });
};

// POST USER (REGISTER)
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    // Required fields check
    return next(new BadRequestError("All fields are required"));
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password; // Removes password before sending
      res.status(201).send({ data: userObj }); // Wrap user in data property
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      return next(err);
    });
};

// LOGIN
const login = (req, res, next) => {
  const { email, password } = req.body;
  // Check for missing fields
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError("Incorrect email or password")));
};

// UPDATE USER
const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  if (!name && !avatar) {
    // At least one field must be provided
    return next(new BadRequestError("Name or avatar must be provided"));
  }
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

// UPDATE AVATAR
// Handles file upload for user avatar using multer middleware in the route
const updateAvatar = (req, res, next) => {
  if (!req.file) {
    return next(new BadRequestError("No file uploaded"));
  }
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.file.path }, // Save the file path from multer upload
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
  updateAvatar,
};
