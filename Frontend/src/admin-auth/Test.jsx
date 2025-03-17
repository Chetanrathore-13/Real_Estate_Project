import { useState } from "react";
import "./test.scss";
import backgroundImage from "../../public/hero.jpg";
import iconOne from "../../public/home-search.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PropertyListings from "../components/Property-listing";
import PropertyListings2 from "../components/Propety-listings2";
import balcony from "../../public/images/balcony.jpg";
import discussion from "../../public/images/discussion.jpg";
import office from "../../public/images/office.jpg";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import ContactForm from "../components/ContactUs2";
import NewsArticlesSection from "../components/NewsArticleSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the menu after clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Header */}
      <div className="header-container py-10 bg-white z-40">
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
      </div>

      {/* Hero Section */}
      <div
        className="herosection h-screen bg-center bg-no-repeat bg-cover -mt-[120px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        }}
      >
        <div className="container mx-auto px-5 flex items-center h-full">
          <div className="content w-[50%] space-y-5">
            <h1 className="text-white text-[60px] font-bold">
              Find a Home You'll Love
            </h1>
            <p className="text-gray-100 pb-10 text-[18px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              illo labore! Architecto, perspiciatis atque! Aspernatur
              perspiciatis unde, vitae maiores cumque nisi sint repudiandae
              asperiores suscipit officia delectus qui. Eaque, officiis.
            </p>
            <a
              href="/login"
              className="pt-2 pb-3 px-6 hover:bg-white bg-[#e86822]  hover:text-black text-white transition-all rounded-sm text-xl font-semibold"
            >
              Explore Properties
            </a>
          </div>
        </div>
      </div>

      {/* Property */}
      <div className="property-container bg-[#f8f8f8] py-16 h-screen">
        <div className="container mx-auto px-5 flex justify-between items-strech flex-wrap">
          <div className="left basis-[50%] min-w-[50%] pr-10 space-y-5">
            {/* Icon box */}
            <div className="icon-box bg-white shadow-md p-8 flex space-x-6 rounded-md">
              <div className="icon min-w-[10%]">
                <img src={iconOne} alt="" srcset="" className="w-[50px]" />
              </div>
              <div className="icon-box-content min-w-[90%]">
                <h3 className="font-semibold text-[25px]">Buy a new home</h3>
                <p className="pt-3  pb-7">
                  Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe
                  suscorem ipsum dolor sit ametcipsum
                </p>
                <a
                  href="/signup"
                  className="bg-[#e86822] text-white pt-2 pb-3 px-6 hover:bg-white hover:text-black transition-all rounded-sm invisible"
                >
                  Sign Up
                </a>
              </div>
            </div>

            {/* Icon box */}
            <div className="icon-box bg-white shadow-md p-8 flex space-x-6 rounded-md">
              <div className="icon min-w-[10%]">
                <img src={iconOne} alt="" srcset="" className="w-[50px]" />
              </div>
              <div className="icon-box-content min-w-[90%]">
                <h3 className="font-semibold text-[25px]">Buy a new home</h3>
                <p className="pt-3  pb-7">
                  Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe
                  suscorem ipsum dolor sit ametcipsum
                </p>
                <a
                  href="/signup"
                  className="bg-[#e86822] text-white pt-2 pb-3 px-6 hover:bg-white hover:text-black transition-all rounded-sm invisible"
                >
                  Sign Up
                </a>
              </div>
            </div>

            {/* Icon box */}
            <div className="icon-box bg-white shadow-md p-8 flex space-x-6 rounded-md">
              <div className="icon min-w-[10%]">
                <img src={iconOne} alt="" srcset="" className="w-[50px]" />
              </div>
              <div className="icon-box-content min-w-[90%]">
                <h3 className="font-semibold text-[25px]">Buy a new home</h3>
                <p className="pt-3  pb-7">
                  Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe
                  suscorem ipsum dolor sit ametcipsum
                </p>
                <a
                  href="/signup"
                  className="bg-[#e86822] text-white pt-2 pb-3 px-6 hover:bg-white hover:text-black transition-all rounded-sm invisible icon-btn"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
          <div className="rightp-6 basis-[50%] min-w-[50%] flex flex-col gap-5 justify-center items-center  ">
            <div className="m-10 flex  flex-col gap-5">
            <h3 className="font-semibold text-[50px] ">
              We Understand <br/>The Real Value <br/> of Home
            </h3>
           
            <p className="text-[20px]">
              We’ll make sure your property gets in front of the right people.
              Lorem ipsum dolor sit amet, consec tetur cing elit.
            </p>
           
            <div className="flex gap-10">
             <div className="flex ">
             <Avatar className="h-20 w-20 ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-20 w-20 -translate-x-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-20 w-20 -translate-x-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
             </div>
              <div className="flex justify-center items-center hover:underline">
              <a className="text-[18px] font-bold" href="">View Property Type</a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listing */}
      <PropertyListings/>

      {/* Property Listing Part 2 */}
      <PropertyListings2/>

      {/* why choose us */}
      <section className="bg-[#0a0f47] text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Why choose Real Estate</h2>
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
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Wider range of properties</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse suscorem ipsum dolor sit ametcipsum
              suscorein ipsumg elit.
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
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Trusted by thousands</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse suscorem ipsum dolor sit ametcipsum
              suscorein ipsumg elit.
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
                className="w-full h-auto object-cover hover:scale-150 transition-all duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Dedicated property service</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse suscorem ipsum dolor sit ametcipsum
              suscorein ipsumg elit.
            </p>
          </div>
        </div>
      </div>
    </section>
    {/* <ContactUs/> */}
    <ContactForm/>

    <NewsArticlesSection/>
    <Footer/>
    </>
  );
};

export default Navbar;
