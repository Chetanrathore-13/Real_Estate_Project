import React from "react";

const Form = () => {
  return (
    <div className="w-full mx-auto p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row mt-5 items-start gap-6 md:gap-8">
      {/* Left Side - Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-start">
        <p className="text-xl sm:text-2xl mt-4 md:mt-6 font-semibold text-[#080E51] mb-2">
          For more information about our services, get in touch with our expert consultants. We're always eager to hear from you!
        </p>
        <p className="text-gray-500 mb-4 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam alias quas, facere quod numquam tempora doloremque ullam.
        </p>

        {/* Contact and Hours of Operation sections */}
        <div className="mt-6 md:mt-10 flex flex-col space-y-6 sm:space-y-10">
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10">
            {/* Contact Section */}
            <div className="flex items-start space-x-4">
              <img src="/ContactUs/call.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Contact</h2>
                <p className="mt-2 text-sm sm:text-base">Office: 1-323 900 6800</p>
                <p className="text-sm sm:text-base">Mobile: 123 900 68668</p>
                <p className="text-sm sm:text-base">Fax: 123 900 68098</p>
                <p className="text-sm sm:text-base">Email: hello@homeid.com</p>
              </div>
            </div>

            {/* Hours of Operation Section */}
            <div className="flex items-start space-x-4">
              <img src="/ContactUs/hour.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Hours of Operation</h2>
                <p className="mt-2 text-sm sm:text-base">Monday – Friday:</p>
                <p className="text-sm sm:text-base">09:00 – 20:00</p>
                <p className="mt-2 text-sm sm:text-base">Sunday & Saturday:</p>
                <p className="text-sm sm:text-base">10:30 – 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 bg-white  p-4 sm:p-6 rounded-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 text-sm sm:text-base"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Mobile no.</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 text-sm sm:text-base"
              placeholder="Enter your Mobile No"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 text-sm sm:text-base"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full sm:w-48 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-400 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
