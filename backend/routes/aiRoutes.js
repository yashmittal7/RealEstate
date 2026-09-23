const express = require("express");
const router = express.Router();

const {
  generateDescription,
  searchWithAI,
  askAdvisor,
  getRecommendations,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

router.post(
  "/generate-description",
  protect,
  generateDescription
);

router.post(
  "/search",
  protect,
  searchWithAI
);

router.post(
  "/advisor",
  protect,
  askAdvisor
);

router.post(
"/recommend",
protect,
getRecommendations
);

module.exports = router;