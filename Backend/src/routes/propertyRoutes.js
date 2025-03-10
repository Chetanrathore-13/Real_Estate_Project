import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getProperties,
  addProperty,
  deleteProperty,
  updateProperty,
} from "../controllers/property.controller.js";
import { upload } from "../multer/upload.js";

const router = express.Router();

router.get("/properties", getProperties);
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

export default router;
