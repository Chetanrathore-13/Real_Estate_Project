import express from "express"

import { getBlogTags,createBlogTag,updateBlogTag,deleteBlogTag} from "../controllers/blog-tag.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/blog_tags", authMiddleware, getBlogTags);
router.post("/add_blog_tag", authMiddleware, createBlogTag);
router.delete("/delete_blog_tag/:id", authMiddleware, deleteBlogTag);
router.patch("/update_blog_tag/:id", authMiddleware, updateBlogTag);

export default router