import PropertyType  from "../models/propertyType.js";

export const getPropertyTypes = async (req, res) => {
    try {
      const propertyTypes = await PropertyType.find();
      res.status(200).json(propertyTypes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const addPropertyType = async (req, res) => {
    try {
      const { title, icon, description } = req.body;
      const propertyType = new PropertyType({ title, icon,description });
      await propertyType.save();
      res.status(201).json(propertyType);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const deletePropertyType = async (req, res) => {
    try {
      const { id } = req.params;
      await PropertyType.findByIdAndDelete(id);
      res.json({ message: "Property Type deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const updatePropertyType = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedPropertyType = await PropertyType.findByIdAndUpdate(id, updatedData, { new: true });
      res.json(updatedPropertyType);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}