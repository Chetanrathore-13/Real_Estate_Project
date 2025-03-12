import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";

const PropertyDetails = () => {
  const { slug } = useParams(); // Get slug from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
const token = useSelector((state)=> state.auth.token)
  useEffect(() => {
    fetchPropertyDetails();
  }, [slug]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/property/properties/${slug}`,{headers:{Authorization:token}});
      setProperty(data.property);
      console.log(data)
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Skeleton className="h-40 w-full rounded-lg" />;
  }

  if (!property) {
    return <p className="text-center text-red-500">Property not found.</p>;
  }

  return (
    <div className="p-6">
      <Card className="border rounded-lg">
        {/* Feature Image */}
        {property.featureImage && (
          <img
            src={property.featureImage} // Directly using base64 string
            alt={property.name}
            className="w-full h-90 object-cover"
          />
        )}

        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold">{property.name}</h2>
          <p className="text-gray-600">{property.address}</p>
          <p className="font-semibold">
            {property.Prefix} {property.price} {property.pricePostfix}
          </p>
          <p className="text-sm">
            {property.areaSize} {property.areaSizePostfix} | {property.totalBedRooms} Beds |{" "}
            {property.totalRooms} Rooms | {property.garage_parking_size} Parking
          </p>

          {/* Image Gallery */}
          {Array.isArray(property.imageGallery) && property.imageGallery.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {property.imageGallery.map((image, index) => (
                <img
                  key={index}
                  src={image} // Directly using base64 string
                  alt={`Gallery ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          {/* Additional Details */}
          <div className="mt-4">
            <p className="text-lg font-semibold">Features:</p>
            <ul className="list-disc list-inside text-gray-600">
              {property.featureName?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetails;
