import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


export default function PropertyListings() {
    const token = useSelector((state)=> state.auth.token)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [properties, setProperties] = useState([]);
    const [hasMore, setHasMore] = useState(false);

  
  const fetchProperties = async () => {
    
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/properties`, {
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
      <div className="flex flex-col space-y-2 gap-4 justify-center items-center m-10 w-[25%]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-blue-950 font-semibold text-navy-900">
          Properties
          <br className="md:hidden" /> for Sale
        </h1>
        <p className="text-xl text-blue-950">Listings we think you&apos;ll love.</p>
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

      <div className="relative ml-28 w-[75%]">
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
    <Card className="relative w-full h-[400px] md:h-[450px] lg:h-[400px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={property.featureImage || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Box */}
      <div className="absolute bottom-2 left-6 right-6 bg-white backdrop-blur-md p-4 rounded-xl shadow-md">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          {property.featureName && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-3 py-1 rounded">
              {property.featureName[0]}
            </Badge>
          )}
          {property.labelName && (
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-3 py-1 rounded">
              {property.labelName[0]}
            </Badge>
          )}
        </div>

        {/* Title & Price */}
        <Link to={`/property/${property.slug}`}><h3 className=" hover:text-orange-500 text-xl font-semibold text-gray-900">{property.name}</h3></Link>
        <p className="text-lg font-bold text-gray-800 ">{property.sellingPrice}</p>

        {/* Arrow Icon */}
        <div className="flex justify-end mt-4">
          <ChevronRight className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-all" />
        </div>
      </div>
    </Card>
  );
}

