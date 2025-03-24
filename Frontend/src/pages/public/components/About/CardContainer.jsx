import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function CardContainer() {
  const cards = [
    { 
      id: 1, image: "/aboutus/our-team-01.jpg", name: "John Doe", title: "Software Engineer", 
      socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
    },
    { 
      id: 2, image: "/aboutus/our-team-02.jpg", name: "Jane Smith", title: "Product Manager", 
      socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
    },
    { 
      id: 3, image: "/aboutus/our-team-03.jpg", name: "Michael Brown", title: "UI/UX Designer", 
      socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
    }
  ];

  return (
    <div className="container mx-auto px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="relative p-6 text-center group">
            {/* Image with hover effect */}
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={card.image} 
                alt={card.name} 
                className="w-full  object-cover rounded-lg transition duration-300 group-hover:opacity-75"
              />

              {/* Social Icons (Hidden by default, shown on hover) */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 group-hover:opacity-100 transition duration-300">
                <a href={card.socials.facebook} className="text-black hover:text-gray-700 transition">
                  <FaFacebookF size={20} />
                </a>
                <a href={card.socials.twitter} className="text-black hover:text-gray-700 transition">
                  <FaTwitter size={20} />
                </a>
                <a href={card.socials.linkedin} className="text-black hover:text-gray-700 transition">
                  <FaLinkedinIn size={20} />
                </a>
                <a href={card.socials.instagram} className="text-black hover:text-gray-700 transition">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            {/* Name & Title */}
            <h2 className="text-2xl text-[#080E51] font-semibold mt-4">{card.name}</h2>
            <p className="text-gray-600">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
