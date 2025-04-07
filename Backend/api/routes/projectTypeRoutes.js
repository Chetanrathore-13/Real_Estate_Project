import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import {
    addProjectType,
    getProjectType,
    updateProjectType,
    deleteProjectType
} from "../controllers/projectType.controller.js"
import { upload } from "../multer/upload.js"

const router = express.Router()

router.get("/get_projectTypes",getProjectType);
router.post("/add_projectType",authMiddleware,upload.single("icon"),addProjectType);
router.patch("/update_projectType/:slug",authMiddleware,upload.single("icon"),updateProjectType);
router.delete("/delete_projectType/:slug",authMiddleware,deleteProjectType)

export default router