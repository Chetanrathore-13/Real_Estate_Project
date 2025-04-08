import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getProperties,
  getPropertyBySlug
} from "../controllers/property.controller.js";
import { upload } from "../multer/upload.js";

const router = express.Router();

router.get("/properties", getProperties);
router.get("/properties/:slug", getPropertyBySlug);

export default router;
