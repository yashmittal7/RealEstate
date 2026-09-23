import api from "./api";

export const generateDescription = async (data) => {
  const response = await api.post("/ai/generate-description", data);

  return response.data;
};

export const aiSearch = async (query) => {
  const response = await api.post("/ai/search", {
    query,
  });

  return response.data;
};

export const askAdvisor = async (propertyId, question) => {
  const response = await api.post("/ai/advisor", {
    propertyId,
    question,
  });

  return response.data;
};

export const getRecommendations = async (preferences) => {
  const response = await api.post("/ai/recommend", preferences);

  return response.data;
};
