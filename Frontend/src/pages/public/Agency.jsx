import React from 'react';
import SearchSection from './components/Blogs/SearchSection';
import Listings from './components/Agency/Listing';
import NavbarMine from './components/NavbarMine';
import FooterMine from './components/FooterMine';


const Agency = () => {
  return (
    <div>
      <NavbarMine />
      {/* Header Section */}
      <header className="w-full h-[450px] relative">
        <img
          src="https://wp1.themevibrant.com/newwp/homy/wp-content/uploads/2024/01/img_49.jpg"
          alt="Blog Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between text-black px-6 sm:px-12 lg:px-20">
          {/* Left Side - Title and Breadcrumb */}
          <div className="text-left max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Agency</h1>
            <p className="text-base sm:text-lg mt-8">
              <span className="underline decoration-black">Home / Agency</span>
            </p>
          </div>

          {/* Right Side - Description */}
          <div className="max-w-lg mt-2 sm:mt-0">
            <p className="text-3xl leading-relaxed">
              Over 745,000 listings, apartments, lots, and plots available now!
            </p>
          </div>
        </div>
      </header>

      {/* Listings Section */}
      <Listings />

      <SearchSection/>
      <FooterMine/>
    </div>
  );
};

export default Agency;
