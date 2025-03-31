import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import axios from "axios"
import { useSelector } from "react-redux"

function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/get_blog/${slug}`, {
          headers: {
            Authorization:token,
          },
        })
        if (data) {
          console.log(data.data)
          setBlog(data.data)
        } else {
          navigate("/not-found")
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error)
        navigate("/not-found")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [slug, navigate])

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!blog) {
    return null
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/admin/blogs">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blogs</span>
          </Button>
        </Link>
        <Link to={`/admin/blogs/edit/${slug}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <span>Edit Blog</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{blog.categoryName}</Badge>
            <span className="text-sm text-muted-foreground">By {blog.authorName}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{blog.title}</h1>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src={`data:image/jpeg;base64,${blog.imageBase64}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p>{blog.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail

