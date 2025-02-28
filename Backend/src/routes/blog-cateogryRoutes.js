import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createBlogCategory,
    getBlogCategories,
    updateBlogCategory,
    deleteBlogCategory
} from "../controllers/blog-category.controller.js";
import { upload } from "../multer/upload.js";

const router = express.Router();

router.get("/blog_categories", authMiddleware, getBlogCategories);
router.post("/add_blog_category", authMiddleware,upload.single("image"), createBlogCategory);
router.delete("/delete_blog_category/:id", authMiddleware, deleteBlogCategory);
router.patch("/update_blog_category/:id", authMiddleware,upload.single("image"), updateBlogCategory);

export default router;