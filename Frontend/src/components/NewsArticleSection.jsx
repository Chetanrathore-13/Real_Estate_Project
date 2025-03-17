
import { Link } from "react-router-dom"
import { Calendar } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"


export default function NewsArticlesSection() {
  // Sample articles data
  const articles = [
    {
      id: 1,
      category: "MY HOME",
      date: "July 24, 2020",
      title: "Modern apartment adjacent",
      excerpt:
        "Massa tempor nec feugiat nisl pretium. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh",
      image: "/placeholder.svg?height=300&width=500",
      titleColor: "#0a0a5e",
    },
    {
      id: 2,
      category: "MY HOME",
      date: "July 2, 2020",
      title: "We are Offering the Best RED",
      excerpt:
        "Massa tempor nec feugiat nisl pretium. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh",
      image: "/placeholder.svg?height=300&width=500",
      titleColor: "#0a0a5e",
    },
    {
      id: 3,
      category: "REAL HOMES",
      date: "June 9, 2020",
      title: "Architects design a Resort",
      excerpt:
        "Massa tempor nec feugiat nisl pretium. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh",
      image: "/placeholder.svg?height=300&width=500",
      titleColor: "#f26522",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a5e]">Recent News & Articles</h2>
          <p className="text-muted-foreground text-lg">Read from the Blog</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
            <Card key={article.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={500}
                  height={300}
                  className="w-full h-[220px] object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1">
                  {article.category}
                </span>
              </div>
              <CardContent className="pt-6 pb-2">
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: article.titleColor }}>
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm">{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-[#0a0a5e] font-semibold hover:underline">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

