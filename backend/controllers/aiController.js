const Property = require("../models/Property");
const {
  generatePropertyDescription,
  extractPropertyFilters,
  propertyAdvisor,
  recommendProperties,
} = require("../services/aiService");
const { getCandidateProperties } = require("../services/recommendationService");

const generateDescription = async (req, res) => {
  try {
    const description = await generatePropertyDescription(req.body);

    res.json({
      description,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchWithAI = async (req, res) => {
  try {
    const filters = await extractPropertyFilters(req.body.query);

    res.json(filters);
  } catch (error) {
    console.error("AI Search Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const askAdvisor = async (req, res) => {
  try {
    const { propertyId, question } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const answer = await propertyAdvisor(property, question);

    res.json({
      answer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const preferences = req.body;

    const candidates = await getCandidateProperties(preferences);

    const aiRecommendations = await recommendProperties(
      preferences,
      candidates,
    );
    console.log(JSON.stringify(aiRecommendations, null, 2));
    const response = aiRecommendations.recommendations
      .map((rec) => {
        const property = candidates.find(
          (p) => p._id.toString().trim() === rec.id.trim(),
        );

        if (!property) return null;

        return {
          ...property.toObject(),

          matchScore: rec.score,

          summary: rec.summary || "Recommended by EstateHub AI.",

          highlights: rec.highlights || [],
        };
      })
      .filter(Boolean);

    res.json({
      recommendations: response,
    });
  } catch (error) {
    console.error("AI Recommendation Error:");
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateDescription,
  searchWithAI,
  askAdvisor,
  getRecommendations,
};
