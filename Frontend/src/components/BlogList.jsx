import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

function BlogList({ role }) {
  console.log(role); // ✅ Debugging role

  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearch(searchTerm);
      setPage(1); // Reset to first page when search changes
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  useEffect(() => {
    setIsLoading(true);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/blog/get_blogs`,
          {
            params: { search, page, limit: 9 },
            headers: role === "admin" ? { Authorization: token } : {}, // ✅ Only send token for admin
          }
        );

        console.log("API Response:", response.data); // ✅ Debugging
        setBlogs(response.data.blogwithicon);
        setHasMore(response.data.hasMore || false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]); // Prevent errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [role, token, page, search]);

  const handleDeleteClick = (id) => {
    setBlogToDelete(id);
    setDialogOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(Math.max(1, newPage));
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/blog/delete_blog/${blogToDelete}`,
          {
            headers: { Authorization: token },
          }
        );

        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogToDelete)
        );
      } catch (error) {
        console.error("Failed to delete blog:", error);
      } finally {
        setDialogOpen(false);
        setBlogToDelete(null);
      }
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tagNames?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      blog.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8 mt-10">
      <div className="flex items-center justify-center mt-4">
        {role === "admin" && (
          <h1 className="text-4xl font-bold tracking-tight ">
            Blog Management
          </h1>
        )}
        {role === "public" && (
          <h1 className="text-4xl font-semibold text-center "> Our Blog </h1>
        )}

        {/* Show Add New Blog button only for admin */}
        {role === "admin" && (
          <Link to="new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Blog
            </Button>
          </Link>
        )}
      </div>

      <div className="flex justify-end">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No blogs found</h3>
          <p className="text-muted-foreground mt-2">
            {blogs.length === 0
              ? "Get started by creating your first blog post"
              : "Try adjusting your search term"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card key={blog._id} className="flex flex-col">
              <CardHeader className="relative">
                <img
                  src={`data:image/jpeg;base64,${blog.imageBase64}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon">
                        <span className="sr-only">Open menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`${blog.slug}`}>View</Link>
                      </DropdownMenuItem>

                      {/* Hide Edit/Delete for public users */}
                      {role === "admin" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to={`edit/${blog.slug}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(blog._id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="mb-2">
                    {blog.categoryName}
                  </Badge>
                  <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    By {blog.authorName}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {blog.description}
                </p>
              </CardContent>
            </Card>
          ))}
          {/* Pagination Controls */}
        </div>
      )}
        <div className="flex justify-center  gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 font-medium">
              Page {page}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={!hasMore}
            >
              Next
            </Button>
          </div>
    </div>
  );
}

export default BlogList;
