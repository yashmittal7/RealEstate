const Property = require("../models/Property");
const User = require("../models/user");

/*const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email");

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const query = {};

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.location) {
      query.location = {
        $regex: req.query.location,
        $options: "i",
      };
    }

    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }

    const properties = await Property.find(query);

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};*/

const createProperty = async (req, res) => {
  try {
    const imageUrls = (req.files || []).map(
      (file) => file.path
    );

    const property = await Property.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      propertyType: req.body.propertyType,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      images: imageUrls,
      owner: req.user._id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const query = {};

    if (req.query.location) {
      query.location = {
        $regex: req.query.location,
        $options: "i",
      };
    }

    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Property.countDocuments(query);

    let sortOption = {};

    if (req.query.sort === "lowToHigh") {
      sortOption.price = 1;
    }

    if (req.query.sort === "highToLow") {
      sortOption.price = -1;
    }

    if (req.query.sort === "newest") {
      sortOption.createdAt = -1;
    }

    const properties = await Property.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email",
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await property.deleteOne();

    res.json({
      message: "Property deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user._id,
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProperties =
      await Property.countDocuments();

    res.json({
      users: totalUsers,
      properties: totalProperties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getDashboardStats,
};
