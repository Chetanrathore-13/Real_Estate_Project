import { Bed, Bath, SquareIcon as SquareFoot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
export default function PropertyListings2() {
    const token = useSelector((state)=> state.auth.token)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [properties, setProperties] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const fetchProperties = async () => {
        
        try {
          const { data } = await axios.get("http://localhost:8000/api/v1/property/properties", {
            params: { search, page, limit: 6 },
            headers: { Authorization: token }
          });
          if (data && Array.isArray(data.formattedProperties)) {
            setProperties(data.formattedProperties);
            console.log(data.formattedProperties)
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

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-4">Properties for Rent</h1>
        <p className="text-xl text-gray-500">Listings we think you&apos;ll love.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </main>
  )
}

function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
    <div className="relative group">
      <Link to={`/property/${property.slug}`}>
        <img
          src={property.featureImage || "/placeholder.svg"}
          alt={property.title}
          width={500}
          height={300}
          className="w-full h-[220px] object-cover transition-all duration-300"
        />
        {/* Black overlay effect */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
      </Link>
  
      <div className="absolute top-4 left-4 flex gap-2">
        {property.featured && (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium">FEATURED</Badge>
        )}
        <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium">FOR RENT</Badge>
      </div>
    </div>
  
    <CardContent className="flex-grow pt-6">
      <Link to={`/property/${property.slug}`}>
        <h2 className="text-xl font-bold text-navy-900 mb-1 hover:text-orange-500">{property.name}</h2>
      </Link>
      <Link to={`/property/${property.slug}`}>
        <p className="text-gray-500 mb-2 hover:text-orange-500">{property.address}</p>
      </Link>
      <p className="text-xl font-bold text-navy-900">
        ${property.sellingPrice.toLocaleString()} <span className="text-gray-500 font-normal">/ month</span>
      </p>
    </CardContent>
  
    <CardFooter className="border-t pt-4 pb-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-1">
          <Bed className="h-5 w-5 text-orange-500" />
          <span className="text-gray-700">{property.totalRooms} Br</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="h-5 w-5 text-orange-500" />
          <span className="text-gray-700">{property.totalBedRooms} Ba</span>
        </div>
        <div className="flex items-center gap-1">
          <SquareFoot className="h-5 w-5 text-orange-500" />
          <span className="text-gray-700">{property.areaSize} SqFt</span>
        </div>
      </div>
    </CardFooter>
  </Card>
  
  )
}

