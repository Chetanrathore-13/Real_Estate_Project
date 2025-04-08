import ContactUs from "../models/contactUs.js";

export const getContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.find();
        res.status(200).json(contactUs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact us data" });
    }
};
