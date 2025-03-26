import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getprojects,
    addproject,
    deleteproject,
    updateproject,
    getproject
} from "../controllers/project.controller.js";

const router = express.Router();    
import { upload } from "../multer/upload.js";

router.get("/projects", getprojects);
router.post("/add_project", authMiddleware, upload.fields([
    { name: "featureImage", maxCount: 1 },
    { name: "imageGallery", maxCount: 5 },
  ]), addproject);
router.delete("/delete_project/:slug", authMiddleware, deleteproject);
router.patch("/update_project/:slug", authMiddleware, updateproject);
router.get("/get_project/:slug", getproject);

export default router;