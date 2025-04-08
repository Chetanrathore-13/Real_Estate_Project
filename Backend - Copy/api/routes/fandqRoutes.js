import express from "express";
import {
    getFandQ,
} from "../controllers/fandq.controller.js";

const router = express.Router();

router.get("/get_faqs", getFandQ);

export default router;