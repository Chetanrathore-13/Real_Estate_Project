import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create contact" });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update contact" });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete contact" });
    }
};