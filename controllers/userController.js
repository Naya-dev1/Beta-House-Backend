const User = require("../models/User");
const Property = require("../models/Property");

const addFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ status: "error", message: "Property not found" });
    }

    const user = await User.findById(userId);

    if (user.favourites.includes(propertyId)) {
      return res
        .status(400)
        .json({ status: "error", message: "Property already in favourites" });
    }

    user.favourites.push(propertyId);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Property added to favourites",
      data: user.favourites,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const removeFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const user = await User.findById(userId);

    if (!user.favourites.includes(propertyId)) {
      return res.status(400).json({
        status: "error",
        message: "Property not in favourites",
      });
    }

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== propertyId
    );

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Property removed from favourites",
      data: user.favourites,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

module.exports = { addFavourite, removeFavourite };
