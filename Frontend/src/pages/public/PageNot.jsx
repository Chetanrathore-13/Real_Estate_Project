import React from 'react';
import Navbar from '../../components/Navbar';
// import { useNavigate } from 'react-router-dom';

const PageNot = () => {
//   const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <header className="w-full relative">
        {/* Responsive Image */}
        <img 
          src="/PageNotFound/ils_08.svg" 
          alt="Page Not Found" 
          className="w-full h-64 sm:h-80 md:h-auto object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-5xl mb-4 font-semibold">
            Oops! It looks like <br /> you're lost.
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700">
            The page you're looking for isn't available. Try to search again <br className="hidden sm:block"/> or use the go to
          </p>

          {/* Back Button */}
          <button
            // onClick={() => navigate('/')}
            className="mt-3 sm:mt-5 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-lg hover:bg-orange-500 rounded-3xl w-40 sm:w-48 transition"
          >
            Back to Home
          </button>
        </div>
      </header>
    </div>
  );
};

export default PageNot;
