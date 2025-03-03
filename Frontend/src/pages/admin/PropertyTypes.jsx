import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export default function PropertyTypes() {
  const [formData, setFormData] = useState({ title: '', icon: null, description: '' });
  const [editId, setEditId] = useState(null);
  const [features, setFeatures] = useState([]);
  const token = useSelector(state => state.auth.token);  // Ensure user is authenticated

  useEffect(() => {
    fetchPropertyFeatures();
  }, []);

  const fetchPropertyFeatures = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/property/features", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, icon: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.icon || !formData.description) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("icon", formData.icon);
      formDataToSend.append("description", formData.description);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      };

      if (editId) {
        await axios.put(`http://localhost:8000/api/v1/property/features/${editId}`, formDataToSend, { headers });
      } else {
        await axios.post("http://localhost:8000/api/v1/property/features", formDataToSend, { headers });
      }

      fetchPropertyFeatures();
      resetForm();
    } catch (error) {
      console.error("Error saving feature:", error);
    }
  };

  const handleEdit = (feature) => {
    setFormData({ title: feature.title, icon: null, description: feature.description });
    setEditId(feature._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/property/features/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPropertyFeatures();
      } catch (error) {
        console.error("Error deleting feature:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', icon: null, description: '' });
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Property Features</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Icon</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} required={!editId} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button type="submit" className="bg-primary hover:bg-primary-dark">
            {editId ? "Update" : "Create"}
          </Button>
          {editId && (
            <Button type="button" onClick={resetForm} variant="outline">
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature._id}>
                <TableCell className="font-medium">{feature.title}</TableCell>
                <TableCell>
                  {feature.icon && (
                    <img src={`http://localhost:8000/uploads/${feature.icon}`} alt="Icon" className="h-8 w-8 object-contain" />
                  )}
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{feature.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(feature)} variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(feature._id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

