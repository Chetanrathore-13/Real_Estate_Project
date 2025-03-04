import Blog from "../models/blog.js";
import slugify from "slugify";
import fs from "fs";
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

    return res.status(200).json(blogwithicon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(blog);
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
