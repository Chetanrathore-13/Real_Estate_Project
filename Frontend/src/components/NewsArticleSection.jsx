import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NewsArticlesSection() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs...");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/get_blogs`, {
          params: { search, page, limit: 6 },
        });

        setBlogs(response.data.blogwithicon || []);
        setHasMore(response.data.hasMore || false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]); // Prevent errors
      }
    };

    fetchBlogs();
  }, [page, search]); // Removed `token` from dependencies

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a5e]">
            Recent News & Articles
          </h2>
          <p className="text-muted-foreground text-lg">Read from the Blog</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogs.map((article) => (
            <Card
              key={article._id}
              className="border-none shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={article.imageBase64 ? `data:image/jpeg;base64,${article.imageBase64}` : "/placeholder.svg"}
                  alt={article.title || "Article Image"}
                  width={500}
                  height={300}
                  className="w-full h-[220px] object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1">
                  {article.categoryName}
                </span>
              </div>
              <CardContent className="pt-6 pb-2">
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{article.createdAt}</span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: article.titleColor }}
                >
                  {article.title}
                </h3>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/blog/${article._id}`}
                  className="text-[#0a0a5e] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
