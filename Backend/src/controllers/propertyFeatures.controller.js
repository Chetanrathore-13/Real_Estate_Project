import PropertyFeature from "../models/propertyFeatures.js";

// Get all property features
export const getPropertyFeatures = async (req, res) => {
  try {
    const features = await PropertyFeature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new property feature
export const addPropertyFeature = async (req, res) => {
  try {
    const { title, icon, description } = req.body;
    const feature = new PropertyFeature({ title, icon , description});
    await feature.save();
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a property feature
export const deletePropertyFeature = async (req, res) => {
  try {
    const { id } = req.params;
    await PropertyFeature.findByIdAndDelete(id);
    res.json({ message: "Property Feature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a property feature
export const updatePropertyFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedFeature = await PropertyFeature.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedFeature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
