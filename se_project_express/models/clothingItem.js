const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
    minLength: 2,
    maxLength: 30,
  },
  weather: {
    type: String,
    required: [true, "The weather field is required"],
    enum: {
      values: ["hot", "warm", "cold"],
      message: "Weather must be one of: hot, warm, cold",
    },
  },
  imageUrl: {
    type: String,
    required: [true, "The image field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
