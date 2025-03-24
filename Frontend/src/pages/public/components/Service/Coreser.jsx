import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    icon: "https://cdn-icons-png.flaticon.com/512/25/25694.png", // Home icon URL
    title: "Find Your Dream Home",
    description:
      "Discover a variety of homes tailored to your needs. Choose from luxury villas, apartments, and townhouses.",
    link: "/find-home",
  },
  {
    id: 2,
    icon: "https://cdn-icons-png.flaticon.com/512/2942/2942954.png", // Building icon URL
    title: "Commercial Properties",
    description:
      "Browse through office spaces, retail stores, and warehouses available for rent or purchase.",
    link: "/commercial-properties",
  },
  {
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Map Pin icon URL
    title: "Plots & Land",
    description:
      "Explore a wide range of land options suitable for building your dream home or investment property.",
    link: "/plots-land",
  },
  {
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Map Pin icon URL
    title: "Plots & Land",
    description:
      "Explore a wide range of land options suitable for building your dream home or investment property.",
    link: "/plots-land",
  },
  {
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Map Pin icon URL
    title: "Plots & Land",
    description:
      "Explore a wide range of land options suitable for building your dream home or investment property.",
    link: "/plots-land",
  },
  {
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Map Pin icon URL
    title: "Plots & Land",
    description:
      "Explore a wide range of land options suitable for building your dream home or investment property.",
    link: "/plots-land",
  },
];

export default function Coreser() {
  return (
    <section className="py-20 bg-black w-full">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <h2 className="text-7xl mt-19 font-bold text-white mb-4">Core Services</h2>

        {/* Subheading */}
        <p className="text-xl mt-5 text-gray-300 mb-16">
          Over 745K listings of apartments, lots, plots - available today.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-10 border bg-white border-gray-300  shadow-lg text-left hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-left border-black rounded-lg">
                <img src={service.icon} alt={service.title} className="w-16 h-16" />
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-black mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6">{service.description}</p>

              {/* Button */}
              <div className="flex justify-left">
                <Link to={service.link}>
                  <button className="px-6 py-3 text-lg bg-white text-black border border-black rounded-lg hover:bg-orange-600 hover:border-orange-600 transition-all duration-300">
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
