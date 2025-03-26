import { Link } from "react-router-dom"
import { Bed, Bath, Square, Home } from "lucide-react"

function PropertyCard({ property, compact = false }) {
  // Create a slug from the property name if not provided
  console.log(property)
  const slug = property.slug || property.name.toLowerCase().replace(/\s+/g, "-")

  if (compact) {
    return (
      <div className="flex gap-3 pb-3 border-b last:border-0">
        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
          <img
            src={property.featureImage || "/placeholder.svg?height=100&width=100"}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <Link to={`/property/${slug}`} className="hover:underline">
            <h4 className="font-medium line-clamp-1">{property.name}</h4>
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3" />
              {property.totalBedRooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3 w-3" />
              {property.totalRooms - property.totalBedRooms}
            </span>
            <span className="flex items-center gap-1">
              <Square className="h-3 w-3" />
              {property.areaSize} {property.areaSizePostfix}
            </span>
          </div>
          <div className="mt-1 font-medium">
            {property.pricePrefix || ""} {property.sellingPrice.toLocaleString()} {property.pricePostfix || ""}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full border border-gray-200">
      <div className="relative aspect-video">
        <img
          src={property.featureImage || "/placeholder.svg?height=300&width=500"}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        {property.status && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
              {property.status.name}
            </span>
          </div>
        )}
        {property.label && property.label.length > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm font-medium">
              {property.label[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/property/${slug}`} className="hover:underline">
          <h3 className="text-lg font-semibold">{property.name}</h3>
        </Link>

        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Home className="h-4 w-4" />
          <span>{property.type && property.type.length > 0 ? property.type[0].name : "Property"}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="flex flex-col items-center p-2 bg-gray-100 rounded-md">
            <Bed className="h-4 w-4 mb-1" />
            <span className="text-xs">{property.totalBedRooms} Beds</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-100 rounded-md">
            <Bath className="h-4 w-4 mb-1" />
            <span className="text-xs">{property.totalRooms - property.totalBedRooms} Baths</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-100 rounded-md">
            <Square className="h-4 w-4 mb-1" />
            <span className="text-xs">
              {property.areaSize} {property.areaSizePostfix}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-xl font-bold">
              {property.pricePrefix || ""} {property.sellingPrice.toLocaleString()} {property.pricePostfix || ""}
            </span>
            {property.regularPrice > property.sellingPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">{property.regularPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard

