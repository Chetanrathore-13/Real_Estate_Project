import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createBlog,getBlogs,updateBlog,deleteBlog} from "../controllers/blog.controller.js"

const router = express.Router()


router.post("/add_blog", authMiddleware, createBlog);
router.get("/get_blogs", getBlogs);
router.patch("/update_blog/:id", authMiddleware, updateBlog);
router.delete("/delete_blog/:id", authMiddleware, deleteBlog);

export default router 
