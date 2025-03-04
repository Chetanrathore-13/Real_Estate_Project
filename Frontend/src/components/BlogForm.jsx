import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { X, Upload, Loader2 } from "lucide-react";
import { blogService } from "../services/blogService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useSelector } from "react-redux";
import axios from "axios";

function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    categoryId: "",
    tagId: [],
    authorId: "",
    featureImage: "",
  });
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchBlog = async () => {
      if (isEditMode) {
        try {
          const blog = await blogService.getBlogById(id);
          if (blog) {
            setFormData({
              title: blog.title,
              description: blog.description,
              category: blog.category,
              categoryId: blog.categoryId,
              authorId: userid,
              featureImage: blog.featureImage,
            });
            setTags(blog.tags || []);
            setImagePreview(blog.featureImage);
          } else {
            navigate("/not-found");
          }
        } catch (error) {
          console.error("Failed to fetch blog:", error);
          navigate("/not-found");
        }
      }
    };
    fetchBlog();
  }, [id, isEditMode, navigate, userid]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/blogcategory/blog_categories", {
          headers: { Authorization: token },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/blogtag/blog_tags", {
          headers: { Authorization: token },
        });
        setAvailableTags(response.data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };
    fetchTags();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find((cat) => cat.name === value);
    setFormData((prev) => ({
      ...prev,
      category: value,
      categoryId: selectedCategory ? selectedCategory._id : "",
    }));
  };

  const handleTagChange = (value) => {
    const selectedTag = availableTags.find((tag) => tag.name === value);
    if (selectedTag && !tags.includes(selectedTag._id)) {
      setTags((prevTags) => [...prevTags, selectedTag._id]); // Store tag ID, not name
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, featureImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      formData.authorId = userid;
      formData.tagId = tags;

      const blogData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "tagId") {
          formData[key].forEach((tag) => blogData.append("tagId[]", tag)); // Append each tag correctly
        } else {
          blogData.append(key, formData[key]);
        }
      });

      if (isEditMode) {
        await blogService.updateBlog(id, blogData);
      } else {
        // print the form data
        console.log("Form Data:", blogData);
        const response = await axios.post("http://localhost:8000/api/v1/blog/add_blog", blogData, {
          headers: { Authorization: token, "Content-Type": "multipart/form-data" },
        });
        navigate(`/admin/blogs`);
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{isEditMode ? "Edit Blog" : "Create New Blog"}</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={5} required />

        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-2">
          <Label>Tags</Label>
          <Select onValueChange={handleTagChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {availableTags.map((tag) => (
                <SelectItem key={tag._id} value={tag.name}>{tag.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32" />}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : isEditMode ? "Update Blog" : "Create Blog"}
        </Button>
      </form>
    </div>
  );
}

export default BlogForm;
