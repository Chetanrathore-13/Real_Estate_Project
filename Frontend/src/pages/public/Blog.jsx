import React from 'react';
import CardGrid from './components/Blogs/CardGrid';
import SearchSection from './components/Blogs/SearchSection';
import FooterMine from './components/FooterMine';
import NavbarMine from './components/NavbarMine';

const Blog = () => {
  const categories = ["All", "For Sale", "Villa", "Apartment", "Home", "Mortgage", "Flats"];

  return (
    <>
    <NavbarMine/>
      {/* Header Section */}
      <header className="w-full relative">
  <img src="/blogs/ils_07.svg" alt="Blog Header" className="w-full object-cover" />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Blogs</h1>
    <p className="text-base sm:text-lg mt-2">
      <span className="underline decoration-black">Home / Blog</span>
    </p>
  </div>
</header>


{/* Categories Buttons */}
<div className="flex flex-wrap mt-10 sm:mt-16 md:mt-20 mb-10 sm:mb-16 md:mb-20 gap-3 sm:gap-4 md:gap-5 justify-center lg:mb-4">
  {categories.map((category) => (
    <button
      key={category}
      className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 border border-gray-400 rounded-full text-gray-700 font-medium transition duration-300 hover:bg-orange-500 hover:text-white text-sm sm:text-base"
    >
      {category}
    </button>
  ))}
</div>


      {/* Cards Section */}
      <div className="mt-1">
        <CardGrid />
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mb-16 ">
        <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
          {/* Backward Arrow */}
          <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-orange-500 hover:text-white transition">
            &#8592;
          </button>

          {/* Numbered Buttons */}
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 font-medium hover:bg-orange-500 hover:text-white transition"
            >
              {num}
            </button>
          ))}

          {/* Forward Arrow */}
          <button className="px-3 py-2 bg-gray-200 rounded-md hover:bg-orange-500 hover:text-white transition">
            &#8594;
          </button>
        </div>
      </div>
      <div className="search">
        <SearchSection/>
      </div>
      <div className="footer">
        <FooterMine/>
      </div>
    </>
  );
};

export default Blog;
