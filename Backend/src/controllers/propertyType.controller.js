import PropertyType  from "../models/propertyType.js";
import fs from "fs"
export const getPropertyTypes = async (req, res) => {
    try {
      const propertyTypes = await PropertyType.find();
      const propertytypeswithicon = propertyTypes.map((type) => {
        let imageBase64 = null;
        try {
          if (fs.existsSync(type.icon)) {
            imageBase64 = fs.readFileSync(type.icon, { encoding: "base64" });
          } else {
            console.warn(`Image not found at path: ${type.icon}`);
          }
          return { ...type.toObject(), imageBase64: imageBase64 };
        } catch (error) {
          console.error(`Error reading image file: ${error.message}`);
        }
      })
      
      res.status(200).json(propertytypeswithicon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const addPropertyType = async (req, res) => {
    try {
      const { title, description } = req.body;
      const propertyType = new PropertyType({ title, icon: req.file.path,description });
      await propertyType.save();
      res.status(201).json(propertyType);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const deletePropertyType = async (req, res) => {
    try {
      const { id } = req.params;
      const propertyType =  await PropertyType.findByIdAndDelete(id);

      if (!propertyType) {
        return res.status(404).json({ message: "Property Type not found" });
      }
      //delete the file
      if (propertyType.icon) {
        fs.unlinkSync(propertyType.icon);
      }
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