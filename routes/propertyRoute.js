const express = require("express");

const {
  createProperty,
  getAllProperties,
  getEachProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.post("/create", createProperty);
router.get("/", getAllProperties);
router.get("/:id", getEachProperty);
router.put("/:id/update", updateProperty);
router.delete("/:id/delete", deleteProperty);

module.exports = router;
