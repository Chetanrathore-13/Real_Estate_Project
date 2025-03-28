import React from "react";

const Form = ({ contact }) => {
  return (
    <div className="w-full mx-auto p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row items-start gap-8 bg-gray-100 shadow-lg">
      {/* Left Side - Information Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-start">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#080E51] mb-4">
          Get in Touch with Us!
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Need more details about our services? Our expert consultants are ready to assist you!
        </p>

        {/* Contact & Hours Section */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md">
            <img src="/ContactUs/call.png" alt="Call Icon" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-bold text-[#080E51]">Contact</h3>
              <p className="text-sm text-gray-700 mt-1">Office: {contact?.officeNumber}</p>
              <p className="text-sm text-gray-700">Mobile: {contact?.whatsAppNumber}</p>
              <p className="text-sm text-gray-700">Fax: 123 900 68098</p>
              <p className="text-sm text-gray-700">Email: {contact?.email}</p>
            </div>
          </div>

          {/* Hours of Operation */}
          <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md">
            <img src="/ContactUs/hour.png" alt="Hour Icon" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-bold text-[#080E51]">Hours of Operation</h3>
              <p className="text-sm text-gray-700 mt-1">{contact?.openingHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold text-[#080E51] mb-4">Send Us a Message</h3>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium text-sm">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm">Mobile No.</label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-sm"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm">Message</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-sm"
              rows="4"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full sm:w-48 bg-[#F97316] text-white py-3 rounded-lg hover:bg-[#EA580C] transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
