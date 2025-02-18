import propertyLabel from "../models/propertyLabel.js";

export const getPropertyLabels = async (req, res) => {
    try {
        const propertyLabels = await propertyLabel.find();
        res.json(propertyLabels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

export const addPropertyLabel = async (req, res) => {
    try {
        const { title, icon, description } = req.body;
        const propertyLabel = new propertyLabel({ title, icon, description });
        await propertyLabel.save();
        res.status(201).json(propertyLabel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePropertyLabel = async (req, res) => {
    try {
        const { id } = req.params;
        await propertyLabel.findByIdAndDelete(id);
        res.json({ message: "Property Label deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePropertyLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPropertyLabel = await propertyLabel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedPropertyLabel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}