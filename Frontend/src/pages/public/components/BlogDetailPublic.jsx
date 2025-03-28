import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailPublic = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/blog/get_blog/${slug}`
        );
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  return (
    <div className=" m-12 min-h-screen p-6 pt-20 ">
    <Card>
      <img
        src={`data:image/jpeg;base64,${blog.imageBase64}`}
        alt={blog.title}
        className="w-full h-full object-cover rounded-t-lg"
      />
      <CardContent className="p-8">
        <h1 className="text-5xl font-extrabold mb-6">{blog.title}</h1>
        <div className="flex gap-3 mb-4">
          <Badge className="text-lg p-2">{blog.categoryName}</Badge>
          {blog.tags?.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary" className="text-lg p-2">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">{blog.description}</p>
        <p className="text-md text-gray-500 font-medium">
          By {blog.authorId?.name} | {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  </div>
  );
};

export default BlogDetailPublic;
