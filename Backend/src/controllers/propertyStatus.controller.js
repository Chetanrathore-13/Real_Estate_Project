import PropertyStatus from "../models/propertyStatus.js";
import fs from "fs";

export const getPropertyStatus = async (req, res) => {
    console.log("main to chl rh hu")
    try {
        const propertyStatus = await PropertyStatus.find();
        if (!propertyStatus) {
            return res.status(404).json({ message: "Property Status not found" });
        }
        const propertystatuswithicon = propertyStatus.map((status) => {
         let imageBase64 = null;
         try {
           if (fs.existsSync(status.icon)) {
             imageBase64 = fs.readFileSync(status.icon, { encoding: "base64" });
           } else {
             console.warn(`Image not found at path: ${status.icon}`);
           }
         } catch (error) {
           console.error(`Error reading image file: ${error.message}`);
         }
         return { ...status.toObject(), imageBase64: imageBase64 };
        })

        res.status(200).json(propertystatuswithicon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addPropertyStatus = async (req, res) => {
    try {
        const { title,description } = req.body;
        const propertyStatus = new PropertyStatus({ title,icon:req.file.path,description });
        await propertyStatus.save();
        res.status(201).json(propertyStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePropertyStatus = async (req, res) => {
    console.log("main to status update kr rha hu")
    console.log(req.body)
    console.log(req.params)
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPropertyStatus = await PropertyStatus.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedPropertyStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePropertyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        await PropertyStatus.findByIdAndDelete(id);
        res.json({ message: "Property Status deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};