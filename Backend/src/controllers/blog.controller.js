import Blog from "../models/blog.js";
import slugify from "slugify";
import fs from "fs";
import User from "../models/user.js";
import BlogTag from "../models/blog-tags.js";
import BlogCategory from "../models/blog-category.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    // const { title, description, categoryId, tagId, authorId } = req.body;
    const { title, description, categoryId, authorId } = req.body;
    let { tagId } = req.body;
    // console.log(req.body,req.file);

    // Ensure tagId is an array
    if (!Array.isArray(tagId)) {
      tagId = typeof tagId === "string" ? tagId.split(",") : [];
    }

    if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res
        .status(400)
        .json({ error: "Blog with this title already exists" });
    }

    console.log(req.body);


    const blog = await Blog.create({
      title,
      description,
      categoryId,
      tagId,
      authorId,
      featureImage:req.file.path,
    });
    
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
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

    blogwithicon.forEach((blog, index) => {
        blog.authorName = authorName[index];
    });
    return res.status(200).json(blogwithicon);
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

// Update a blog by ID
export const updateBlog = async (req, res) => {
  
  try {
    const slug = req.params.slug;
    const {title,description,categoryId,tagId,authorId} = req.body;
    console.log(tagId)

    const blog = await Blog.findOne({slug});
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    // Check if name is changing and if it already exists
    if (title && title !== blog.title) {
      const existblogtitle = await Blog.findOne({
        slug: slugify(title, { lower: true, strict: true }),
      });
      if (existblogtitle) {
        return res
          .status(400)
          .json({ error: "Blog with title already exists" });
      }
    }
    // Prepare updated data
    const updatedData = { title,description,categoryId,tagId,authorId };

    if (req.file) {
      updatedData.featureImage = req.file.path;
    }
     // Delete the old image if it exists
    if (blog.featureImage) {
      const imagePath = blog.featureImage;
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      }
    }
    const blogs = await Blog.findOneAndUpdate({slug}, updatedData, {
      new: true,
    });
    if (!blogs) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    // Delete the image file from the server
    if (blog.featureImage) {
      const imagePath = blog.featureImage;
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      }
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
