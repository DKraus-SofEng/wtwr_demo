const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require(`../utils/errors`);

// POST CLOTHING ITEM
const createClothingItem = (req, res, next) => {
  const { name, weather, image } = req.body;
  const owner = req.user._id; // Use the authenticated user's ID
  // Required fields check
  if (!name || !weather || !image) {
    return next(
      new BadRequestError("Name, weather, and image URL are required")
    );
  }
  return ClothingItem.create({ name, weather, imageUrl: image, owner })
    .then((item) => item.populate("owner"))
    .then((populatedItem) => res.status(201).send(populatedItem))
    .catch((err) => {
      console.error("Mongoose error:", err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid clothing item data"));
      }
      return next(err);
    });
};

// GET CLOTHING ITEMS
const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .populate("owner")
    .then((items) => res.status(200).send(items))
    .catch((err) => next(err));
};

// UPDATE CLOTHING ITEMS
const updateClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const { image } = req.body;
  if (!image) {
    return next(new BadRequestError("Image URL is required"));
  }
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageUrl: image } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => clothingItem.populate("owner"))
    .then((populatedItem) => res.status(200).send(populatedItem))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid clothing item data"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found"));
      }
      return next(err);
    });
};

// DELETE CLOTHING ITEMS
const deleteClothingItem = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return next(new ForbiddenError("You can only delete your own items."));
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({ message: "Clothing item deleted" })
      );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found"));
      }
      return next(err);
    });
};

// LIKE CLOTHING ITEM
const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } }, // add userId to likes array if not present
    { new: true }
  )
    .orFail()
    .then((item) => item.populate("owner"))
    .then((populatedItem) => res.status(200).send(populatedItem))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

// DISLIKE CLOTHING ITEM
const dislikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } }, // remove userId from likes array
    { new: true }
  )
    .orFail()
    .then((item) => item.populate("owner"))
    .then((populatedItem) => res.status(200).send(populatedItem))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  updateClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
