import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getContacts,
    addContact,
    deleteContact,
    updateContact
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/contacts", authMiddleware, getContacts);
router.post("/add_contact", authMiddleware, addContact);
router.delete("/delete_contact/:id", authMiddleware, deleteContact);
router.patch("/update_contact/:id", authMiddleware, updateContact);

export default router;