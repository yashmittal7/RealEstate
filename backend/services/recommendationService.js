const Property = require("../models/Property");

const getCandidateProperties = async (preferences) => {
  const query = {};

  if (preferences.location)
    query.location = {
      $regex: preferences.location,
      $options: "i",
    };

  if (preferences.propertyType)
    query.propertyType = preferences.propertyType;

  if (preferences.maxPrice)
    query.price = {
      $lte: preferences.maxPrice,
    };

  if (preferences.bedrooms)
    query.bedrooms = {
      $gte: preferences.bedrooms,
    };

  const properties = await Property.find(query).limit(10);

  return properties;
};

module.exports = {
  getCandidateProperties,
};