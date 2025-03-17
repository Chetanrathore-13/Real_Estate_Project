import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"


export default function PropertyListings() {
    const token = useSelector((state)=> state.auth.token)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [properties, setProperties] = useState([]);
    const [hasMore, setHasMore] = useState(false);

//   const properties = [
//     {
//       id: 1,
//       title: "Store in Woodside, New York",
//       price: "$1,250,000",
//       image: "/placeholder.svg?height=400&width=600",
//       featured: true,
//       forSale: true,
//     },
//     {
//       id: 2,
//       title: "Hermosa casa al norte",
//       price: "$1,250,000",
//       image: "/placeholder.svg?height=400&width=600",
//       featured: true,
//       forSale: true,
//     },
//     {
//       id: 3,
//       title: "Casa Lomas de Machalí",
//       price: "$1,250,000",
//       image: "/placeholder.svg?height=400&width=600",
//       featured: true,
//       forSale: true,
//     },
//     {
//       id: 4,
//       title: "Modern Apartment in Downtown",
//       price: "$950,000",
//       image: "/placeholder.svg?height=400&width=600",
//       featured: true,
//       forSale: true,
//     },
//     {
//       id: 5,
//       title: "Luxury Villa with Ocean View",
//       price: "$2,750,000",
//       image: "/placeholder.svg?height=400&width=600",
//       featured: true,
//       forSale: true,
//     },
//   ]

  
  const fetchProperties = async () => {
    
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/property/properties", {
        params: { search, page, limit: 10 },
        headers: { Authorization: token }
      });
      if (data && Array.isArray(data.formattedProperties)) {
        setProperties(data.formattedProperties);
      } else {
        setProperties([]); // Fallback to empty array
      }
  
      setHasMore(data.hasMore || false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]); // Prevent undefined
    }
  };
   useEffect(() => {
      fetchProperties();
    }, [page, search]);

  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const visibleItems = 3
  const maxIndex = properties.length - visibleItems

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  return (
    <div className="space-y-8 flex m-10">
      <div className="flex flex-col space-y-2 justify-center items-center m-10">
        <h1 className="text-4xl md:text-5xl lg:text-4xl font-semibold text-navy-900">
          Properties
          <br className="md:hidden" /> for Sale
        </h1>
        <p className="text-lg text-gray-600">Listings we think you&apos;ll love.</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative ml-28">
        <div ref={scrollContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
          {properties.slice(currentIndex, currentIndex + visibleItems).map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden border-0 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="relative h-64 w-full">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {property.featureName && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-3 py-1 rounded">
              {property.featureName.map((feature) => feature).join(", ")}
            </Badge>
          )}
          {property.labelName && (
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-3 py-1 rounded">
             {property.labelName.map((label) => label).join(", ")}
            </Badge>
          )}
        </div>
        <img src={property.featureImage || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
      </div>
      <CardContent className="p-0">
        <div className="bg-white p-6 flex justify-between items-center">
          <div>
            <h3 className="font-medium text-lg">{property.name}</h3>
            <p className="text-lg font-bold">{property.sellingPrice}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}

