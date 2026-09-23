import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const addToFavorites = async (propertyId) => {
  const response = await api.post(`/users/favorites/${propertyId}`);
  return response.data;
};
