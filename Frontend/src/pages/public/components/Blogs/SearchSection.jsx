export default function SearchSection() {
  return (
    <div
      className="relative w-full sm:h-56 md:h-64 lg:h-80 bg-cover bg-center flex items-center px-4 sm:px-6 md:px-12 lg:px-20"
      style={{ backgroundImage: "url('/blogs/bck2.jpg')" }}
    >
      {/* Overlay for better text visibility */}  
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between w-full items-center text-center sm:text-left">
        {/* Left: Heading */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold max-w-xs sm:max-w-md">
          Start your Journey As a Retailer.
        </h2>

        {/* Right: Enlarged Input & Button */}
        <div className="mt-4 sm:mt-0 flex items-center bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md w-full sm:w-[75%] md:w-[60%] lg:w-[40%]">
          <input
            type="text"
            placeholder="Enter location..."
            className="flex-grow p-2 outline-none text-gray-700 text-sm sm:text-base"
          />
          <button className="bg-orange-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md hover:bg-orange-600 transition">
            Find Out
          </button>
        </div>
      </div>
    </div>
  );
}
