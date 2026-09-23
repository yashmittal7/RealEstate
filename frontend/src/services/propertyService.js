import api from "./api";

export const createProperty = async (formData) => {
  const response = await api.post("/properties", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getProperties = async (params = {}) => {
  const response = await api.get("/properties", { params });
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const getMyProperties = async () => {
  const response = await api.get("/properties/my-properties");
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/properties/stats");
  return response.data;
};
