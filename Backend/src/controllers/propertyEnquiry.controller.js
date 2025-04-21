import PropertyEnquiry from "../models/propertyEnquiry.js";

export const createPropertyEnquiry = async (req, res) => {
    try {
        const { fullName, contactNumber, email, property, propertyType, user } = req.body;
        const propertyEnquiry = await PropertyEnquiry.create({ fullName, contactNumber, email, property, propertyType, user });
        res.status(201).json(propertyEnquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPropertyEnquiries = async (req, res) => {
    try {
        const propertyEnquiries = await PropertyEnquiry.find();
        res.json(propertyEnquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updatePropertyEnquiry = async (req, res) => {
    try {
        const propertyEnquiry = await PropertyEnquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!propertyEnquiry) {
            return res.status(404).json({ error: "Property Enquiry not found" });
        }
        res.json(propertyEnquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePropertyEnquiry = async (req, res) => {
    try {
        const propertyEnquiry = await PropertyEnquiry.findByIdAndDelete(req.params.id);
        if (!propertyEnquiry) {
            return res.status(404).json({ error: "Property Enquiry not found" });
        }
        res.json({ message: "Property Enquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};