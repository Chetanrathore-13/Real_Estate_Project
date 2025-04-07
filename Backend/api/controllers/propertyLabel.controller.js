import PropertyLabel from "../models/propertyLabel.js";
import fs from 'fs';
export const getPropertyLabels = async (req, res) => {
    try {
        const propertyLabels = await PropertyLabel.find();
        if(!propertyLabels){
            return res.status(404).json({ message: "Property Labels not found" });
        }
        const popertylabelwithicon = propertyLabels.map((label) => {
            let imageBase64 = null;
            try {
                if (fs.existsSync(label.icon)) {
                    imageBase64 = fs.readFileSync(label.icon, { encoding: "base64" });
                } else {
                    console.warn(`Image not found at path: ${label.icon}`);
                }
            } catch (error) {
                console.error(`Error reading image file: ${error.message}`);
            }
            return { ...label.toObject(), imageBase64: imageBase64 };
        })
        res.json(popertylabelwithicon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

export const addPropertyLabel = async (req, res) => {
    try {
        const { title, description } = req.body;
        const propertyLabel = new PropertyLabel({ title, icon: req.file.path, description });
        await propertyLabel.save();
        res.status(201).json(propertyLabel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePropertyLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const label = await PropertyLabel.findByIdAndDelete(id);

        //unlink the image 
        if (fs.existsSync(label.icon)) {
            fs.unlink(label.icon, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                }
            });
        }

        res.json({ message: "Property Label deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePropertyLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPropertyLabel = await PropertyLabel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedPropertyLabel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}