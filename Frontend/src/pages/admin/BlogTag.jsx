import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';

const API_URL = 'http://localhost:8000/api/v1/blogtag';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const BlogTag = () => {
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const token = useSelector((state) => state.auth.token);
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: { name: '' }, // Always initialized
    });
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const headers = token ? { Authorization: token } : {};
        const response = await axios.get(`${API_URL}/blog_tags`, { headers });
        setCategories(response.data || []); // Prevents undefined issues
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    const onSubmit = async (values) => {
      try {
        const headers = token ? { Authorization: token } : {};
        if (editId) {
          await axios.patch(`${API_URL}/update_blog_tag/${editId}`, values, { headers });
        } else {
          await axios.post(`${API_URL}/add_blog_tag`, values, { headers });
        }
        await fetchCategories(); // Ensure immediate update
        form.reset();
        setEditId(null);
      } catch (error) {
        console.error('Error saving tag:', error);
      }
    };
  
    const handleEdit = (tag) => {
      form.setValue('name', tag.name || ''); // Prevents uncontrolled input issues
      setEditId(tag._id);
    };
  
    const handleDelete = async (id) => {
      try {
        const headers = token ? { Authorization: token } : {};
        await axios.delete(`${API_URL}/delete_blog_tag/${id}`, { headers });
        await fetchCategories(); // Ensure immediate update
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    };


  return (
    <div className="max-w-4xl mx-auto p-6">
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editId ? 'Edit Tag' : 'Create New Tag'}</CardTitle>
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
                  <FormControl><Input placeholder="Tag name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{editId ? 'Update tag' : 'Create tag'}</Button>
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
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(categories || []).map((tag) => (
              <TableRow key={tag._id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(tag)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(tag._id)}>Delete</Button>
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

export default BlogTag
