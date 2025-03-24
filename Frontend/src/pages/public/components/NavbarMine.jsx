import { Link } from "react-router-dom"; // Import Link
import { useState, useEffect } from "react";
import logo from "/images/Logo.svg";
import Aboutus from '../Aboutus'

const NavbarMine = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsScrolled(currentScrollPos > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="border-gray-200 h-full">
        <div className="flex flex-wrap justify-between items-center w-full container mx-auto ">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="w-auto h-12 md:h-16" alt="Real Estate Logo" />
            <span className="text-2xl md:text-3xl font-semibold transition-all text-[#e86822]">
              Real Estate
            </span>
          </Link>

          {/* Call-to-Action Buttons */}
          <div className="flex items-center lg:order-2 ">
            <div className="call-to-action-btn space-x-4 hidden lg:flex gap-4 ">
              <Link to="/login" className="pt-2 pb-3 px-6 transition-all rounded-sm text-[#e86822] border border-[#e86822] hover:bg-[#e86822] hover:text-white">
                Login
              </Link>
              <Link to="/signup" className="pt-2 pb-3 px-6 transition-all rounded-sm bg-[#e86822] text-white hover:bg-white hover:text-[#e86822] border border-[#e86822]">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-row space-x-8 font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/projects" },
                { name: "Properties", path: "/properties" },
                { name: "About Us", path: "/about-us" },
                { name: "Contact Us", path: "/contact-us" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="block py-2 text-lg transition-all text-black hover:text-[#e86822]">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default NavbarMine;
