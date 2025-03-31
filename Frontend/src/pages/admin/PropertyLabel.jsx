import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from 'react-redux';
export default function PropertyLabelCRUD() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    icon: null,
    description: ''
  });
  const [editId, setEditId] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/property_labels`, {
        headers: { Authorization: token }
      });
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, icon: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.icon || !formData.description) return;

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('icon', formData.icon);
    formPayload.append('description', formData.description);

    try {
      if (editId) {
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/property/update_property_labels/${editId}`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' , Authorization: token}
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/property/add_property_labels`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: token }
        });
      }
      resetForm();
      fetchProperties();
    } catch (error) {
      console.error("Error saving property status:", error);
    }
  };

  const handleEdit = (property) => {
    setFormData({ title: property.title, icon: null, description: property.description });
    setEditId(property._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/property/delete_property_labels/${id}`, {
          headers: { Authorization: token }
        });
        fetchProperties();
      } catch (error) {
        console.error("Error deleting property status:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', icon: null, description: '' });
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Property Labels</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
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
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter description"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {editId ? 'Update' : 'Create'}
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
            {properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>
                  {property.icon && (
                    <img 
                      src={`data:image/jpeg;base64,${property.imageBase64}`} 
                      alt="Icon" 
                      className="h-8 w-8 object-contain"
                    />
                  )}
                </TableCell>
                <TableCell>{property.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleEdit(property)}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(property._id)}
                    >
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