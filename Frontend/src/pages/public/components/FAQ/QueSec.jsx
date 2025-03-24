import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const topics = [
  {
    title: "Selling",
    faqs: [
      {
        question: "How do I list my property for sale?",
        answer: "You can list your property by creating an account and filling out the listing form."
      },
      { question: "Are there any fees for selling?", answer: "No, listing your property is completely free." }
    ]
  },
  {
    title: "Renting",
    faqs: [
      {
        question: "How do I find a rental property?",
        answer: "You can browse available rentals using filters like price, location, and amenities."
      },
      {
        question: "What documents are needed to rent a property?",
        answer: "Typically, you need an ID, proof of income, and a rental agreement."
      }
    ]
  },
  {
    title: "Buying",
    faqs: [
      {
        question: "How do I apply for a home loan?",
        answer: "You can apply for a home loan by contacting our partnered banks through the platform."
      },
      {
        question: "What should I check before buying a home?",
        answer: "You should verify property documents, location, and market rates before making a decision."
      }
    ]
  }
];

export default function QueSec() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row p-8 bg-gray-100 min-h-screen">
      {/* Left Section - Topics */}
      <div className="w-full md:w-1/3">
        {/* Explore Topics Section */}
        <div className="bg-white p-6 py-10 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Explore Topics</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-orange-500">Q.1 Selling</li>
            <li className="cursor-pointer hover:text-orange-500">Q.2 Renting</li>
            <li className="cursor-pointer hover:text-orange-500">Q.3 Buying</li>
            <li className="cursor-pointer hover:text-orange-500">Q.4 Payment</li>
            <li className="cursor-pointer hover:text-orange-500">Q.5 Terms and Condition</li>
            <li className="cursor-pointer hover:text-orange-500">Q.6 Account</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="mt-6 bg-white p-6 rounded-md ">
          <h2 className="text-2xl font-semibold">Don't Find Your Answer?</h2>
          <div className="mt-5 flex ">
            <button className="w-40 bg-black text-white px-4 py-2 rounded-lg hover:bg-orange-500">
              Contact Us
            </button>
          </div>
        </div>
      </div> {/* <-- This closing div was missing */}

      {/* Right Section - FAQs */}
      <div className="w-full md:w-2/3 md:ml-8 mt-6 md:mt-0">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-400 mb-2 border-b pb-2">{topic.title}</h3>
            <div className="space-y-4">
              {topic.faqs.map((faq, faqIndex) => (
                <div key={faqIndex} className="bg-white p-4 rounded-lg shadow-sm">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(`${topicIndex}-${faqIndex}`)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openIndex === `${topicIndex}-${faqIndex}` ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                  {openIndex === `${topicIndex}-${faqIndex}` && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
