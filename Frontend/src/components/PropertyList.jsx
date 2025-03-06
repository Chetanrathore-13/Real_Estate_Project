import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("/api/properties", config);
        setProperties(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching properties", error);
        setProperties([]);
      }
    };
    fetchProperties();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/properties/${id}`, config);
        setProperties(properties.filter((property) => property._id !== id));
      } catch (error) {
        console.error("Error deleting property", error);
      }
    }
  };

  return (
    <div className="relative p-4">
      <div className="absolute top-0 right-0 m-4">
        <Button onClick={() => navigate("/admin/property/new")} className="bg-blue-600 text-white">Add Property</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <Card key={property._id} className="shadow-lg rounded-lg overflow-hidden">
              <img src={property.featuredImage} alt={property.name} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.description}</p>
                <p className="font-bold mt-2">${property.sellingPrice}</p>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => navigate(`/property/${property.slug}`)} variant="outline">View</Button>
                  <Button onClick={() => navigate(`/edit-property/${property._id}`)} variant="default">Edit</Button>
                  <Button onClick={() => handleDelete(property._id)} variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="w-full col-span-3 text-center">
            <p className="text-gray-500">No properties available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;