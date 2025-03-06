import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const PropertyDetails = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${slug}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };
    fetchProperty();
  }, [slug]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={property.featuredImage}
              alt={property.name}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {property.imageGallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
            <div className="space-y-2">
              <p><span className="font-semibold">Price:</span> ${property.sellingPrice}</p>
              <p><span className="font-semibold">Address:</span> {property.address}</p>
              <p><span className="font-semibold">Description:</span> {property.description}</p>
              {/* Add other property details */}
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Button asChild>
                <Link to={`/properties/edit/${property.slug}`}>Edit</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};