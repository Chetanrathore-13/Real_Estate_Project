import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createBlog,getBlogs,updateBlog,deleteBlog,getBlogById} from "../controllers/blog.controller.js"
import { upload } from "../multer/upload.js";


const router = express.Router()


router.post("/add_blog",authMiddleware,upload.single("featureImage"), createBlog);
router.get("/get_blogs",authMiddleware, getBlogs);
router.patch("/update_blog/:id", authMiddleware, updateBlog);
router.delete("/delete_blog/:id", authMiddleware, deleteBlog);
router.get("/get_blog/:slug", authMiddleware, getBlogById);

export default router 
