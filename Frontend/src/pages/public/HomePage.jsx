import { useState } from "react";
import "../../admin-auth/test.scss";
import backgroundImage from "../../../public/hero.jpg";
import iconOne from "../../../public/home-search.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PropertyListings from "../../components/Property-listing";
import PropertyListings2 from "../../components/Propety-listings2";
import balcony from "../../../public/images/balcony.jpg";
import discussion from "../../../public/images/discussion.jpg";
import office from "../../../public/images/office.jpg";
import Footer from "../../components/Footer";
import ContactUs from "../../components/ContactUs";
import ContactForm from "../../components/ContactUs2";
import NewsArticlesSection from "../../components/NewsArticleSection";
import Navbar from "../../components/Navbar";
import Badge1 from "../../../public/images/Badge1.jpg";
import Badge2 from "../../../public/images/Badge2.jpg";
import Badge3 from "../../../public/images/Badge3.jpg";
const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the menu after clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Header */}
      {/* <div className="header-container py-10 bg-white z-40">
        <header className="header container mx-auto flex justify-between items-center lg:px-5 ">
          <div className="logo-container">
            <h3 className="business-name font-bold uppercase tracking-wide text-white text-xl">
              Roots & Roofs
            </h3>
          </div>
          <div className="navigation-container">
            <nav className="navigation">
              <ul className="nav-link flex justify-center items-center gap-8 uppercase text-sm  text-white tracking-wider font-normal ">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Projects</a>
                </li>
                <li>
                  <a href="#">Properties</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="call-to-action-container">
            <div className="call-to-action-btn space-x-4">
              <a
                href="/login"
                className="  pt-2 pb-3 px-6 hover:bg-[#e86822] bg-white hover:text-white text-black transition-all rounded-sm"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-[#e86822] text-white pt-2 pb-3 px-6 hover:bg-white hover:text-black transition-all rounded-sm"
              >
                Sign Up
              </a>
            </div>
          </div>
        </header>
      </div> */}

      <Navbar />

      {/* Hero Section */}
      <div
        className="herosection min-h-screen  bg-center bg-no-repeat bg-cover flex items-center justify-center px-5  sm:px-10 "
        style={{
          backgroundImage: ` url('https://homeid-elementor-demo9.g5plus.net/wp-content/uploads/2022/12/bg-homepage.jpg')`,
        }}
      >
        <div className="container mx-auto">
          <div className="content w-full md:w-[60%] lg:w-[50%] space-y-12 text-center md:text-left">
            <h1 className="text-blue-950 text-4xl sm:text-5xl md:text-8xl font-semibold leading-tight">
              Find a Home You'll Love
            </h1>
            <p className="text-blue-950 text-lg sm:text-3xl sm:font-semibold">
            Discover a Place You'll Love to Live
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href="/login"
                className="pt-3 pb-3 px-8 hover:bg-white bg-[#e86822] hover:text-black text-white transition-all rounded-sm text-lg sm:text-xl font-semibold"
              >
                Explore Properties
              </a>
            </div>
          </div>
        </div>
      </div>

        {/* Property Listing */}
        <PropertyListings />

      {/* Property */}
      <div className="property-container bg-[#f8f8f8] py-16 min-h-screen">
        <div className="container mx-auto px-5 flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Left Section (Icon Boxes) */}
          <div className="left w-full lg:w-1/2 space-y-5">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="icon-box bg-white shadow-md p-6 sm:p-8 flex flex-col sm:flex-row space-x-0 sm:space-x-6 rounded-md"
              >
                <div className="icon w-full sm:w-[10%] flex justify-center sm:justify-start">
                  <img src={iconOne} alt="Icon" className="w-[50px]" />
                </div>
                <div className="icon-box-content w-full sm:w-[90%] text-center sm:text-left">
                  <h3 className="font-semibold text-xl sm:text-2xl">
                    Buy a new home
                  </h3>
                  <p className="pt-3 pb-5 text-sm sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <a
                    href="/signup"
                    className="bg-[#e86822] text-white py-2 px-6 hover:bg-white hover:text-black transition-all rounded-sm inline-block"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section (Heading & Avatars) */}
          <div className="right w-full lg:w-1/2 flex flex-col items-center text-center lg:text-left px-5">
            <h3 className="font-semibold text-3xl sm:text-4xl lg:text-7xl text-blue-950 ">
              We Understand <br />
              The Real Value <br /> of Home
            </h3>
            <p className="text-base sm:text-lg mt-4">
              We’ll make sure your property gets in front of the right people.
              Lorem ipsum dolor sit amet.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-5 items-center">
              {/* Avatar Section */}
              <div className="flex">
                <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-white shadow-xl rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-x-3">
                  <AvatarImage src={Badge1} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16 sm:h-24 sm:w-24 -translate-x-4 sm:-translate-x-6 border-4 border-white shadow-xl rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-x-8">
                  <AvatarImage src={Badge2} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16 sm:h-24 sm:w-24 -translate-x-8 sm:-translate-x-12 border-4 border-white shadow-xl rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-x-14">
                  <AvatarImage src={Badge3} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              {/* Link with Hover Effects */}
              <div className="flex items-center">
                <a
                  href="#"
                  className="text-lg font-bold text-blue-600 flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-blue-800"
                >
                  View Property Type
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    

      {/* Property Listing Part 2 */}
      <PropertyListings2 />

      {/* why choose us */}
      <section className="bg-[#0a0f47] text-white py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Why choose Real Estate
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              We'll make sure your property gets in front of the right people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col">
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={balcony}
                  alt="Property with balcony"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover hover:scale-125 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Wider range of properties
              </h3>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse
                suscorem ipsum dolor sit ametcipsum suscorein ipsumg elit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={discussion}
                  alt="People collage"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover hover:scale-125 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">Trusted by thousands</h3>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse
                suscorem ipsum dolor sit ametcipsum suscorein ipsumg elit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col">
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={office}
                  alt="Modern building"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover hover:scale-125 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Dedicated property service
              </h3>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse
                suscorem ipsum dolor sit ametcipsum suscorein ipsumg elit.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <ContactUs/> */}
      <ContactForm />

      <NewsArticlesSection />
      <Footer />
    </>
  );
};

export default HomePage;
