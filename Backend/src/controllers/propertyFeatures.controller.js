import PropertyFeature from "../models/propertyFeatures.js";
import fs from "fs";

// Get all property features
export const getPropertyFeatures = async (req, res) => {
  try {
    const features = await PropertyFeature.find();
    
    // Add the imageBase64 property to each feature
   const featuresWithIcon = features.map((feature) => {
     let imageBase64 = null;
     try {
       if (fs.existsSync(feature.icon)) {
         imageBase64 = fs.readFileSync(feature.icon, { encoding: "base64" });
       } else {
         console.warn(`Image not found at path: ${feature.icon}`);
       }
     } catch (error) {
       console.error(`Error reading image file: ${error.message}`);
     }
     return { ...feature.toObject(), imageBase64: imageBase64 };
   })

    res.json(featuresWithIcon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new property feature
export const addPropertyFeature = async (req, res) => {
  try {
    const { title, description } = req.body;
    const feature = new PropertyFeature({ title, icon: req.file.path , description});
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
   const feature = await PropertyFeature.findByIdAndDelete(id);
    if (!feature) {
      return res.status(404).json({ message: "Property Feature not found" });
    }
    // delete the file 
    if (feature.icon) {
      fs.unlinkSync(feature.icon);
    }
    res.json({ message: "Property Feature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a property feature
export const updatePropertyFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedData = {};
    if (title) {
      updatedData.title = title;
    }
    if (description) {
      updatedData.description = description;
    }
    if (req.file) {
      updatedData.icon = req.file.path;
    } 
    // delete the previous file
    const feature = await PropertyFeature.findById(id);
    if (feature.icon) {
      fs.unlinkSync(feature.icon);
    }
    const updatedFeature = await PropertyFeature.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedFeature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
