import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit, Plus } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProjectTypes() {
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: null,
  });
  const [editingSlug, setEditingSlug] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/projectType/get_projectTypes",
        { headers: { Authorization: token } }
      );
      console.log(response.data)
      if (Array.isArray(response.data)) {
        setTypes(response.data);
      } else {
        console.error("Unexpected API response format", response.data);
        setTypes([]);
      }
    } catch (error) {
      console.error("Error fetching types", error);
      setTypes([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.icon) formDataToSend.append("icon", formData.icon);

    if (editingSlug) {
      console.log("editing function is running");
      await axios.patch(
        `http://localhost:8000/api/v1/projectType/update_projectType/${editingSlug}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:8000/api/v1/projectType/add_projectType",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
    }
    setFormData({ title: "", description: "", icon: null });
    setEditingSlug(null);
    fetchTypes();
  };

  const handleDelete = async (slug) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/projectType/delete_projectType/${slug}`,
        { headers: { Authorization: token } }
      );
      fetchTypes();
    } catch (error) {
      console.error("Error deleting type", error);
    }
  };

  const handleEdit = (type) => {
    setFormData({
      title: type.title,
      description: type.description,
      icon: type.imageBase64, // Preserve existing image
    });
    setEditingSlug(type.slug);
  };
  
  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Project Types</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, icon: e.target.files[0] })
          }
          required={!editingSlug}
        />
        <Button type="submit" className="w-full flex items-center gap-2">
          {editingSlug ? "Update Type" : "Add Type"}
          <Plus size={16} />
        </Button>
      </form>
      <div className="space-y-4">
        {types.length === 0 ? (
          <p className="text-center text-gray-500">No types available</p>
        ) : (
          types.map((type) => (
            <Card
              key={type.slug}
              className="p-4 flex justify-between items-center"
            >
              <CardContent className="flex gap-4 items-center">
                {type.imageBase64 && (
                  <img
                    src={type.imageBase64}
                    alt={type.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{type.title}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </CardContent>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit?.(type)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete?.(type.slug)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
