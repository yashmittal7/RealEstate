export const formatPrice = (value) => {
  if (value === undefined || value === null || value === "") {
    return "Price on request";
  }

  return `Rs ${Number(value).toLocaleString("en-IN")}`;
};

export const getPropertyImage = (property) =>
  property?.images?.[0] ||
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";

export const pluralize = (count, singular, plural = `${singular}s`) =>
  Number(count) === 1 ? singular : plural;
