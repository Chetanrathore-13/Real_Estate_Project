import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom"; // For navigation
import { useSelector } from "react-redux";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state)=> state.auth.token)

  useEffect(() => {
    fetchProperties();
  }, [page, search]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/property/properties`, {
        params: { search, page, limit: 9 },
        headers: { Authorization: token }
      });
    console.log(data)
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
    setLoading(false);
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/property/delete_property/${id}`,{headers:{Authorization:token}});
        setProperties(properties.filter((property) => property._id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Properties</h2>
        <Button onClick={() => navigate("/admin/property/new")}>Add Property</Button>
      </div>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search properties..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Loading State */}
      {loading ? (
        <Skeleton className="h-40 w-full rounded-lg" />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {properties?.map((property) => (
            <Card key={property._id} className="border rounded-lg overflow-hidden">
              {/* Feature Image (Base64) */}
              {property.featureImage && (
                <img
                  src={property.featureImage}
                  alt={property.name}
                  className="w-full h-60 object-cover"
                />
              )}
              <CardContent className="p-4">
                {/* Property Info */}
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <p className="text-gray-600">{property.address}</p>
                <p className="font-semibold">
                  {property.Prefix} {property.price} {property.pricePostfix}
                </p>
                <p className="text-sm">
                  {property.areaSize} {property.areaSizePostfix} | {property.totalBedRooms} Beds |{" "}
                  {property.totalRooms} Rooms | {property.garage_parking_size} Parking
                </p>

                {/* Image Gallery (Base64) */}
                {Array.isArray(property.imageGallery) && property.imageGallery.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {property?.imageGallery?.map((image, index) => (
                      <img
                        key={index}
                        src={image} // Base64 image
                        alt={`Gallery ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-3 flex justify-between">
                  <Button onClick={() => navigate(`${property.slug}`)} variant="outline">
                    View
                  </Button>
                  <div className="flex gap-2">
                  <Button onClick={() => navigate(`/edit-property/${property.slug}`)} variant="secondary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(property._id)} variant="destructive">
                    Delete
                  </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="mt-4 flex justify-between">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PropertyList;
