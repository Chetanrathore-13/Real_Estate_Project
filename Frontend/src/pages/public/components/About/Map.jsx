export default function Map({contact}) {
  return (
    <div className="relative w-full mt-5 h-[480px]">
      {/* Map Background */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.95592831531562!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e33!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1648178133621!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Address Box */}
      <div className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 md:p-6 h-auto w-64 md:w-80">
        <h2 className="text-xl text-[#080E51] font-bold">Offices Location</h2>
        <p className="text-gray-600 mt-2">
          {contact?.fullAddress}
        </p>
        <h2 className="text-xl text-[#080E51] mt-6 font-bold">Visit at our office</h2>
        <p className="text-gray-600 mt-2">
        {contact?.fullAddress}
        </p>
      </div>
    </div>
  );
}
