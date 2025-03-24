export default function NewSec() {
  return (
    <div className="container mx-auto px-4 md:px-8 mb-20 py-10">
      {/* Row 1 */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-4">
        <img src="/aboutus/img-1.jpg" alt="Image 1" className="w-full md:w-[65%] object-cover rounded-lg" />
        <img src="/aboutus/img-2.jpg" alt="Image 2" className="w-full md:w-[35%] object-cover rounded-lg" />
      </div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <img src="/aboutus/img-3.jpg" alt="Image 3" className="w-full md:w-[45%] object-cover rounded-lg" />
        <img src="/aboutus/img-4.jpg" alt="Image 4" className="w-full md:w-[55%] object-cover rounded-lg" />
      </div>
    </div>
  );
}
