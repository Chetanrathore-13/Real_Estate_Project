import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

const PropertyStatusManager = () => {
  const [statuses, setStatuses] = useState([]);
  const [form, setForm] = useState({ title: "", icon: null, description: "" });
  const [editingId, setEditingId] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/property/property_status", {
        headers: { Authorization: token },
      });
      console.log("API Response:", data);
      setStatuses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching statuses", error);
      setStatuses([]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, icon: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("icon", form.icon);
      formData.append("description", form.description);

      // Debugging: Check what is inside formData before sending
         for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: token
      };
      if (editingId) {
        // Debugging: Check what is inside formData before sending
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        await axios.patch(`http://localhost:8000/api/v1/property/update_property_status/${editingId}`, formData, {
          headers
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/v1/property/add_property_status", formData, {
          headers
         });
      }
      setForm({ title: "", icon: null, description: "" });
      setEditingId(null);
      fetchStatuses();
    } catch (error) {
      console.error("Error saving status", error);
    }
  };

  const handleEdit = (status) => {
    setForm({ title: status.title, icon: null, description: status.description });
    setEditingId(status._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/property/delete_property_status${id}`, {
        headers: { Authorization: token },
      });
      fetchStatuses();
    } catch (error) {
      console.error("Error deleting status", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Property Status</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <Input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={!editingId}
          />
          <Input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <Button type="submit">{editingId ? "Update" : "Add"} Status</Button>
        </form>
      </Card>

      {statuses.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No property status available.</p>
      ) : (
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statuses.map((status) => (
              <TableRow key={status._id}>
                <TableCell>
                  <img src={`data:image/jpeg;base64,${status.imageBase64}`} alt={status.title} className="w-8 h-8" />
                </TableCell>
                <TableCell>{status.title}</TableCell>
                <TableCell>{status.description}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleEdit(status)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(status._id)}>
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PropertyStatusManager;
