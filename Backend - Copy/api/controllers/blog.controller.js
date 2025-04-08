import Blog from "../models/blog.js";
import fs from "fs";
import User from "../models/user.js";
import BlogTag from "../models/blog-tags.js";
import BlogCategory from "../models/blog-category.js";

// Create a new blog


// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    let { search = "", page = 1, limit = 10 } = req.query;

    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, parseInt(limit) || 10);

    const filter = search.trim()
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const blogs = await Blog.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const total = await Blog.countDocuments(filter)
    const blogwithicon = blogs.map((blog) => {
        let imageBase64 = null;
        if(blog.featureImage){
            try {
                if(fs.existsSync(blog.featureImage)){
                    imageBase64 = fs.readFileSync(blog.featureImage, { encoding: "base64" });
                } else{
                    console.warn(`Image not found at path: ${blog.featureImage}`);
                }
            } catch (error) {
                console.error(`Error reading image file: ${error.message}`);
            }
           
        }
        return {
            ...blog.toObject(),
            imageBase64: imageBase64,
          };
    })
    // Find the Author name through authorId 
    const authorName = await Promise.all(blogwithicon.map(async (blog) => {
        const author = await User.findById(blog.authorId);
       return author.username;
    }))
    const categoryName = await Promise.all(blogwithicon.map(async (blog) => {
        const category = await BlogCategory.findById(blog.categoryId);
       return category.name;
    }))
    const tagNames = await Promise.all(blogwithicon.map(async (blog) => {
        const tags = await BlogTag.find({ _id: { $in: blog.tagId } });
        return tags.map((tag) => tag.name);
    }));

    blogwithicon.forEach((blog, index) => {
        blog.authorName = authorName[index];
        blog.categoryName = categoryName[index];
        blog.tagNames = tagNames[index];
    });
    return res.status(200).json({
      success: true,
      blogwithicon, 
      total,
      hasMore: total > page * limit,});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const slug = req.params.slug;
    const blog = await Blog.findOne({slug});
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
   const blogwithicon = {
        ...blog.toObject(),
        imageBase64: fs.readFileSync(blog.featureImage, { encoding: "base64" }),
      };
    const author = await User.findById(blog.authorId);
    blogwithicon.authorName = author.username;

    // Find tags associated with the blog, tag ids are stored in blog.tags in array
    const tags = await BlogTag.find({ _id: { $in: blog.tagId } });
    blogwithicon.tags = tags.map((tag) => tag.name);
    
    const category = await BlogCategory.findById(blog.categoryId);
    blogwithicon.categoryName = category.name;

    return res.status(200).json(blogwithicon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


