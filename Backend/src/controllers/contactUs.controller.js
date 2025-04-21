import ContactUs from "../models/contactUs.js";

export const getContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.find();
        res.status(200).json(contactUs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact us data" });
    }
};

export const updateContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(contactUs);
    } catch (error) {
        res.status(500).json({ message: "Error updating contact us data" });
    }
};

export const deleteContactUs = async (req, res) => {
    try {
        await ContactUs.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Contact us data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact us data" });
    }
};

export const createContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.create(req.body);
        res.status(201).json(contactUs);
    } catch (error) {
        res.status(500).json({ message: "Error creating contact us data" });
    }
};