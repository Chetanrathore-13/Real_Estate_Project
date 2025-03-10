import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSelector } from "react-redux";
import axios from "axios";

function BlogForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!slug;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tags, setTags] = useState([]);
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

  const handleTagChange = (tagId) => {
    setTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      }
      return [...prev, tagId];
    });
  };

  const removeTag = (tagIdToRemove) => {
    setTags(prev => prev.filter(tagId => tagId !== tagIdToRemove));
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (isEditMode) {
        try {
          const blog = await axios.get(`http://localhost:8000/api/v1/blog/get_blog/${slug}`, {
            headers: { Authorization: token },
          });

          if (blog.data) {
            // Process tags (assuming backend returns tag IDs)
            const backendTags = blog.data.tags || [];
            setTags(backendTags);

            // Process image preview
            const imageBase64 = blog.data.imageBase64;
            const imagePreview = imageBase64.startsWith('data:')
              ? imageBase64
              : `data:image/jpeg;base64,${imageBase64}`;

            setFormData({
              title: blog.data.title,
              description: blog.data.description,
              category: blog.data.category?.name || "", // Adjust based on your backend response
              categoryId: blog.data.category?._id || "",
              authorId: blog.data.authorId,
              featureImage: blog.data.imageBase64,
            });
            
            setImagePreview(imagePreview);
          }
        } catch (error) {
          console.error("Failed to fetch blog:", error);
        }
      }
    };
    fetchBlog();
  }, [slug, isEditMode, token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/blogcategory/blog_categories",
          {
            headers: { Authorization: token },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

    // Update tag display logic
    const getTagName = (tagId) => {
      const tag = availableTags.find(t => t._id === tagId);
      return tag ? tag.name : "Loading...";
    };
  

    // Modify image preview handling
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, featureImage: file }));
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/blogtag/blog_tags",
          {
            headers: { Authorization: token },
          }
        );
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

  // const handleTagChange = (value) => {
  //   const selectedTag = availableTags.find((tag) => tag.name === value);
  //   if (selectedTag && !tags.includes(selectedTag._id)) {
  //     setTags((prevTags) => [...prevTags, selectedTag._id]); // Store tag ID, not name
  //   }
  // };

  // const removeTag = (tagToRemove) => {
  //   setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setImagePreview(imageUrl);
  //     setFormData((prev) => ({ ...prev, featureImage: file }));
  //   }
  // };

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
        const response = await axios.patch(
          `http://localhost:8000/api/v1/blog/update_blog/${slug}`,
          blogData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          navigate(`/admin/blogs`);
        }
      } else {
        // print the form data
        console.log("Form Data:", blogData);
        const response = await axios.post(
          "http://localhost:8000/api/v1/blog/add_blog",
          blogData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
      <h1 className="text-3xl font-bold">
        {isEditMode ? "Edit Blog" : "Create New Blog"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={5}
          required
        />

        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

          <div className="space-y-2">
          <Label>Tags</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                Select tags...
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                  <CommandEmpty>No tags found.</CommandEmpty>
                  <CommandGroup>
                    {availableTags.map((tag) => (
                      <CommandItem
                        key={tag._id}
                        onSelect={() => handleTagChange(tag._id)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={tags.includes(tag._id)}
                            readOnly
                            className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                          />
                          {tag.name}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2 mt-2">
    {tags.map(tagId => (
      <Badge
        key={tagId}
        variant="secondary"
        className="px-3 py-1 text-sm"
      >
        {getTagName(tagId)}
        <button
          type="button"
          onClick={() => removeTag(tagId)}
          className="ml-2 rounded-full outline-none focus:ring-2 focus:ring-ring"
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
    ))}
  </div>
        </div>

        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-32 h-32" />
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : isEditMode ? (
            "Update Blog"
          ) : (
            "Create Blog"
          )}
        </Button>
      </form>
    </div>
  );
}

export default BlogForm;
