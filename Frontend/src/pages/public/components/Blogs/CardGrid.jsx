export default function CardGrid() {
  const cards = [
    {
      image: "/blogs/h1.avif",
      heading: "Luxury Villa",
      subheading: "For Sale",
      description: "A beautiful luxury villa with modern amenities and a great location."
    },
    {
      image: "/blogs/h2.avif",
      heading: "Modern Apartment",
      subheading: "For Rent",
      description: "Spacious apartment with city views, perfect for urban living."
    },
    {
      image: "/blogs/h3.avif",
      heading: "Cozy Home",
      subheading: "For Sale",
      description: "A cozy home in a peaceful neighborhood, ideal for families."
    },
    {
      image: "/blogs/h4.avif",
      heading: "Elegant Flat",
      subheading: "For Rent",
      description: "An elegant flat with premium furnishings and great connectivity."
    }
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow-md rounded-2xl overflow-hidden w-full">
            <img
              src={card.image}
              alt={card.heading}
              className="w-full h-48 object-cover sm:h-56 md:h-64 rounded-t-2xl"
            />
            <div className="p-4 sm:p-6">
              <h2 className="text-sm lg:text-[18px] font-semibold text-gray-800">{card.heading}</h2>
              <h3 className="text-md lg:text-sm text-orange-500 font-medium mt-1">{card.subheading}</h3>
              <p className="text-gray-600 mt-2 lg:mt-2 text-sm sm:text-base">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
