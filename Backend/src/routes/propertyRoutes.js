import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getProperties,
  addProperty,
  deleteProperty,
  updateProperty,
  getPropertyBySlug
} from "../controllers/property.controller.js";
import { upload } from "../multer/upload.js";

const router = express.Router();

router.get("/properties",authMiddleware, getProperties);
router.post(
  "/add_property",
  authMiddleware,
  upload.fields([
    { name: "featureImage", maxCount: 1 },
    { name: "imageGallery", maxCount: 5 },
  ]),
  addProperty
);
router.delete("/delete_property/:id", authMiddleware, deleteProperty);
router.patch("/update_property/:id", authMiddleware, updateProperty);
router.get("/properties/:slug", authMiddleware, getPropertyBySlug);

export default router;
