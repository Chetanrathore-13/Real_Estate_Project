import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit, Plus } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProjectFeatures() {
  const [features, setFeatures] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", icon: null });
  const [editingSlug, setEditingSlug] = useState(null);
  const token = useSelector((state)=> state.auth.token)

  useEffect(() => {
    fetchFeatures();
  }, [token]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/projectFeature/get_projectFeature`,{headers:{Authorization:token}});
      if (Array.isArray(response.data)) {
        console.log(response.data)
        setFeatures(response.data);
      } else {
        console.error("Unexpected API response format", response.data);
        setFeatures([]);
      }
    } catch (error) {
      console.error("Error fetching features", error);
      setFeatures([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.icon) formDataToSend.append("icon", formData.icon);
    
    if (editingSlug) {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/projectFeature/update_projectFeature/${editingSlug}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data",Authorization:token }
      });
    } else {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/projectFeature/add_projectFeature`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data",Authorization:token }
      });
    }
    setFormData({ title: "", description: "", icon: null });
    setEditingSlug(null);
    fetchFeatures();
  };

  const handleDelete = async (slug) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/projectFeature/delete_projectFeature/${slug}`,{headers:{Authorization:token}});
    fetchFeatures();
  };

  const handleEdit = (feature) => {
    setFormData({ title: feature.title, description: feature.description, icon: null });
    setEditingSlug(feature.slug);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Project Features</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-md" encType="multipart/form-data">
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, icon: e.target.files[0] })}
          required
        />
        <Button type="submit" className="w-full flex items-center gap-2">
          {editingSlug ? "Update Feature" : "Add Feature"}
          <Plus size={16} />
        </Button>
      </form>
      <div className="space-y-4">
        {features.length === 0 ? (
          <p className="text-center text-gray-500">No features available</p>
        ) : (
          features.map((feature) => (
            <Card key={feature.slug} className="p-4 flex justify-between items-center">
              <CardContent className="flex gap-4 items-center">
                {feature.icon && <img src={feature.imageBase64} alt={feature.title} className="w-12 h-12 rounded-lg object-cover" />}
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </CardContent>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleEdit(feature)}>
                  <Edit size={16} />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(feature.slug)}>
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
