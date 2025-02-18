import { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    let interval;
    if (autoSlide) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoSlide, images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000); // Resume auto-slide after 10s
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl  "
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      {/* Slides Container */}
      <div className="flex transition-transform duration-500 ease-in-out"
           style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((img, index) => (
          <div 
            key={index}
            className="w-full h-screen flex-shrink-0 relative"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Optional Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
        onClick={() => goToSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)}
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
        onClick={() => goToSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)}
      >
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;