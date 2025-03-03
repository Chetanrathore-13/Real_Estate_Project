import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Project() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featuredImage: "",
    imageGallery: "",
    videoLinks: "",
    projectType: "",
    features: "",
    agent: "",
    properties: ""
  });
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/projects/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/projects", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData({ ...project });
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      featuredImage: "",
      imageGallery: "",
      videoLinks: "",
      projectType: "",
      features: "",
      agent: "",
      properties: ""
    });
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Project Name" required />
          <Input value={formData.featuredImage} onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })} placeholder="Image URL" required />
          <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required />
          <Input value={formData.imageGallery} onChange={(e) => setFormData({ ...formData, imageGallery: e.target.value })} placeholder="Image Gallery (comma-separated URLs)" />
          <Input value={formData.videoLinks} onChange={(e) => setFormData({ ...formData, videoLinks: e.target.value })} placeholder="Video Links (comma-separated)" />
          <Input value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} placeholder="Project Type ID" required />
          <Input value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="Features IDs (comma-separated)" />
          <Input value={formData.agent} onChange={(e) => setFormData({ ...formData, agent: e.target.value })} placeholder="Agent ID" />
          <Input value={formData.properties} onChange={(e) => setFormData({ ...formData, properties: e.target.value })} placeholder="Property IDs (comma-separated)" />
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
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(projects) && projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(project)} variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id)}>Delete</Button>
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