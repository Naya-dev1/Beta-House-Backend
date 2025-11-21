const Property = require("../models/Property");

const createProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      propertyType,
      bedrooms,
      bathrooms,
      isFeatured,
      mainImage,
      videoLink,
      virtualTourLink,
      gallery,
      status,
    } = req.body;

    if (
      !title ||
      !location ||
      !price ||
      !propertyType ||
      !bedrooms ||
      !bathrooms ||
      !status
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all required fields.",
      });
    }

    const property = await Property.create({
      title,
      location,
      price,
      propertyType,
      bedrooms,
      bathrooms,
      isFeatured,
      mainImage,
      videoLink,
      virtualTourLink,
      gallery,
      status,
    });

    return res.status(201).json({
      status: "success",
      message: "Property created successfully",
      data: property,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      const searchTerm = req.query.search;

      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // -----------------------

    if (req.query.status) {
      query.status = req.query.status.toLowerCase();
    }

    if (req.query.bedrooms) {
      query.bedrooms = req.query.bedrooms;
    }

    if (req.query.bathrooms) {
      query.bathrooms = req.query.bathrooms;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType.toLowerCase();
    }

    // ----------------------

    let sort = "-createdAt";

    // -----------------------

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalProperties = await Property.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / limit);

    const properties = await Property.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: "success",
      results: properties.length,
      page,
      totalPages,
      data: properties,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getEachProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ status: "error", message: "Property does not exist" });
    }

    return res.status(200).json({ status: "success", data: property });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!property) {
      return res
        .status(404)
        .json({ status: "error", message: "Property does not exist" });
    }

    return res.status(200).json({
      status: "success",
      message: "Property updated successfully",
      data: property,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ status: "error", message: "Property does not exist" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getEachProperty,
  updateProperty,
  deleteProperty,
};
