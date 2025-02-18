import propertyStatus from "../models/propertyStatus";

export const getPropertyStatus = async (req, res) => {
    try {
        const propertyStatus = await propertyStatus.find();
        res.status(200).json(propertyStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addPropertyStatus = async (req, res) => {
    try {
        const { title,icon,desciption } = req.body;
        const propertyStatus = new propertyStatus({ title,icon,desciption });
        await propertyStatus.save();
        res.status(201).json(propertyStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePropertyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPropertyStatus = await propertyStatus.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedPropertyStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePropertyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        await propertyStatus.findByIdAndDelete(id);
        res.json({ message: "Property Status deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};