import { useState, useEffect } from "react";
import { Bed, Bath, SquareDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PropertyListings2({ filters = {}, setFilters }) {
  const token = useSelector((state) => state.auth.token);
  const [properties, setProperties] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/properties`, {
        params: {
          search: filters.keyword,
          projectType: filters.propertyType === 'All Types' ? '' : filters.propertyType,
          type: filters.searchType,
          page: filters.page,
          limit: 6,
        },
        headers: { Authorization: token },
      });
      
      setProperties(filters.page === 1 ? data.formattedProperties : [...properties, ...data.formattedProperties]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filters.page !== undefined && filters.page !== null) {
      fetchProperties();
    }
  }, [filters.page, filters.keyword, filters.propertyType, filters.searchType]);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-4">
          Properties for {filters.searchType === 'rent' ? 'Rent' : 'Sale'}
        </h1>
        <p className="text-xl text-gray-500">Listings we think you'll love.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))} 
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </main>
  );
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
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
              FEATURED
            </Badge>
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
            <span className="text-gray-700">{property.totalBathrooms} Ba</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareDot  className="h-5 w-5 text-orange-500" />
            <span className="text-gray-700">{property.areaSize} SqFt</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
