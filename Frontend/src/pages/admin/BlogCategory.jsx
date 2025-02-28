import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';

const API_URL = 'http://localhost:8000/api/v1/blogcategory';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  image: z.any().optional(),
});

const BlogCategory = () => {

  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const headers = token ? { Authorization: token } : {};
      const response = await axios.get(`${API_URL}/blog_categories`, { headers });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      if (values.image) formData.append('image', values.image);

      const headers = { Authorization: token, 'Content-Type': 'multipart/form-data' };

      if (editId) {
        await axios.patch(`${API_URL}/update_blog_category/${editId}`, formData, { headers });
      } else {
        await axios.post(`${API_URL}/add_blog_category`, formData, { headers });
      }

      fetchCategories();
      form.reset();
      setImagePreview(null);
      setEditId(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category) => {
    form.setValue('name', category.name);
    form.setValue('description', category.Description || category.description);
    setImagePreview(category.imageBase64 ? `data:image/jpeg;base64,${category.imageBase64}` : null);
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    try {
      const headers = token ? { Authorization: token } : {};
      await axios.delete(`${API_URL}/delete_blog_category/${id}`, { headers });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editId ? 'Edit Category' : 'Create New Category'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="Category name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Category description" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl><Input type="file" accept="image/*" onChange={handleImageChange} /></FormControl>
              {imagePreview && <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md mt-4" />}
            </FormItem>

            <Button type="submit">{editId ? 'Update Category' : 'Create Category'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  {category.imageBase64 && (
                    <img
                      src={`data:image/jpeg;base64,${category.imageBase64}`}
                      alt={category.name}
                      className="h-[100px] w-[100px] object-cover rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.Description || category.description}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(category._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
  )
}

export default BlogCategory
