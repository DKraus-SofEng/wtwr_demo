require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const auth = require("./middlewares/auth");
const clothingItemsRouter = require("./routes/clothingItems");
const errorHandler = require(`./middlewares/error-handler`);
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(console.error);
app.use(express.json());
app.use(
  cors({
    origin: "https://storage.googleapis.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(requestLogger);

// Public routes
app.use("/", usersRouter); // POST /handles signup and signin
app.use("/items", clothingItemsRouter);

// Protected routes

app.use(auth);
app.use("/", mainRouter);

// Error logging
app.use(errorLogger);

// Error handling
app.use(errors()); // celebrate error handler
app.use(errorHandler); // centralized handler

module.exports = app;
