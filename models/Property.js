const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
      enum: ["apartment", "house", "duplex", "villa"],
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    mainImage: {
      type: String,
      required: true,
    },

    videoLink: {
      type: String,
      default: null,
    },

    virtualTourLink: {
      type: String,
      default: null,
    },

    gallery: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["for sale", "for rent"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
