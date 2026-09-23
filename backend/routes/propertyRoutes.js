const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getDashboardStats,
} = require("../controllers/propertyController");

const authorize = require("../middleware/roleMiddleware");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getProperties);
router.get("/my-properties", protect, getMyProperties);
router.get("/stats", protect, getDashboardStats);
router.get("/:id", getPropertyById);
router.post("/",protect,authorize("owner", "admin"),upload.array("images", 5),createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);
//router.post("/favorites/:propertyId",protect,addToFavorites);

module.exports = router;