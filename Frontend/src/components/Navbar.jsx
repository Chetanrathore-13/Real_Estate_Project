import { useState, useEffect } from "react";
import logo from "../../public/images/Logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Detect scroll direction (hide on down, show on up)
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      // Change navbar style on scroll
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
          <a href="/" className="flex items-center gap-2">
            <img src={logo} className="w-auto h-12 md:h-16" alt="Real Estate Logo" />
            <span
              className={`text-2xl md:text-3xl font-semibold transition-all ${
                isScrolled ? "text-[#e86822]" : "text-[#e86822]"
              }`}
            >
              Real Estate
            </span>
          </a>

          {/* Call-to-Action Buttons */}
          <div className="flex items-center lg:order-2 ">
            <div className="call-to-action-btn space-x-4 hidden lg:flex gap-4 ">
              <a
                href="/login"
                className={`pt-2 pb-3 px-6 transition-all rounded-sm ${
                  isScrolled
                    ? "text-[#e86822] border border-[#e86822] hover:bg-[#e86822] hover:text-white"
                    : "bg-white text-black hover:bg-[#e86822] hover:text-white"
                }`}
              >
                Login
              </a>
              <a
                href="/signup"
                className={`pt-2 pb-3 px-6 transition-all rounded-sm ${
                  isScrolled
                    ? "bg-[#e86822] text-white hover:bg-white hover:text-[#e86822] border border-[#e86822]"
                    : "bg-[#e86822] text-white hover:bg-white hover:text-black"
                }`}
              >
                Sign Up
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-row space-x-8 font-medium">
              {["Home", "Projects", "Properties", "About Us", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`block py-2 text-lg transition-all ${
                      isScrolled ? "text-[#e86822]" : "text-blue-950"
                    } hover:text-[#e86822]`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>


        </div>
      </nav>
    </header>
  );
};

export default Navbar;
