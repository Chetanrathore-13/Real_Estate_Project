import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllProperty() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featuredImage: "",
    regularPrice: "",
    sellingPrice: "",
    areaSize: "",
    totalRooms: "",
    address: ""
  });
  const [properties, setProperties] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");
      if (Array.isArray(response.data)) {
        setProperties(response.data);
      } else {
        console.error("API response is not an array:", response.data);
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/properties/${editId}`, formData);
      } else {
        await axios.post("/api/properties", formData);
      }
      fetchProperties();
      resetForm();
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleEdit = (property) => {
    setFormData({ ...property });
    setEditId(property._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`/api/properties/${id}`);
        fetchProperties();
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      featuredImage: "",
      regularPrice: "",
      sellingPrice: "",
      areaSize: "",
      totalRooms: "",
      address: ""
    });
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Properties</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Property Name" required />
          <Input value={formData.featuredImage} onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })} placeholder="Image URL" required />
          <Input value={formData.regularPrice} onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })} placeholder="Regular Price" required />
          <Input value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} placeholder="Selling Price" required />
          <Input value={formData.areaSize} onChange={(e) => setFormData({ ...formData, areaSize: e.target.value })} placeholder="Area Size" required />
          <Input value={formData.totalRooms} onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })} placeholder="Total Rooms" required />
          <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required />
          <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Address" required />
        </div>
        <div className="mt-4 flex gap-2">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">{editId ? "Update" : "Create"}</Button>
          {editId && <Button type="button" onClick={resetForm} variant="outline">Cancel</Button>}
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(properties) ? properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>${property.sellingPrice}</TableCell>
                <TableCell>{property.totalRooms}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(property)} variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(property._id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            )) : <TableRow><TableCell colSpan="4" className="text-center">No properties found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
