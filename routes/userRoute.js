const express = require("express");
const protect = require("../middleware/AuthMiddleware");
const {
  addFavourite,
  removeFavourite,
} = require("../controllers/userController");
const router = express.Router();

router.post("/:propertyId/add", protect, addFavourite);
router.delete("/:propertyId/delete", protect, removeFavourite);

module.exports = router;
