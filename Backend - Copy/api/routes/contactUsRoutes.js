import express from "express";
import {
    getContactUs
} from "../controllers/contactUs.controller.js";

const router = express.Router();

router.get("/get_contacts", getContactUs);

export default router;