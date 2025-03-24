import React from 'react';
import { Card as UICard, CardContent } from "@/components/ui/card"; // Renamed to avoid conflict

const listings = [
  {
    id: 1,
    title: "Luxury Apartment",
    image: "/Agency/cart1.png", // Image from public folder
    rating: "⭐⭐⭐⭐⭐",
    description: "A spacious and modern apartment in the heart of the city.",
  },
  {
    id: 1,
    title: "Luxury Apartment",
    image: "/Agency/cart1.png", // Image from public folder
    rating: "⭐⭐⭐⭐⭐",
    description: "A spacious and modern apartment in the heart of the city.",
  },
  {
    id: 1,
    title: "Luxury Apartment",
    image: "/Agency/cart1.png", // Image from public folder
    rating: "⭐⭐⭐⭐⭐",
    description: "A spacious and modern apartment in the heart of the city.",
  },
  {
    id: 1,
    title: "Luxury Apartment",
    image: "/Agency/cart1.png", // Image from public folder
    rating: "⭐⭐⭐⭐⭐",
    description: "A spacious and modern apartment in the heart of the city.",
  },
  {
    id: 1,
    title: "Luxury Apartment",
    image: "/Agency/cart1.png", // Image from public folder
    rating: "⭐⭐⭐⭐⭐",
    description: "A spacious and modern apartment in the heart of the city.",
  },
  {
    id: 1,
    title: "Luxury Apartment",
    image: "/Agency/cart1.png", // Image from public folder
    rating: "⭐⭐⭐⭐⭐",
    description: "A spacious and modern apartment in the heart of the city.",
  },

];

const Listings = () => {
  return (
    <div className=" mx-10 py-10 mt-10 ">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <UICard
            key={listing.id}
            className="w-full  bg-gray-100 flex flex-col items-center p-6"
          >
            <CardContent className="flex flex-col items-center">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-30 mt-5 object-cover"
              />
              <h2 className="text-2xl font-bold mt-4">{listing.title}</h2>
              <p className="text-yellow-500 text-lg mt-1">{listing.rating}</p>
              <p className="text-center mt-2 text-gray-600">{listing.description}</p>
              <button className="mt-10 w-full px-6 py-3 bg-gray-100 text-black border border-black  hover:bg-orange-500 mx-auto">
                View Listing
              </button>


            </CardContent>
          </UICard>
        ))}
      </div>
    </div>
  );
};

export default Listings;
