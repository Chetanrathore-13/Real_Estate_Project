import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function QueSec() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqTopics, setFaqTopics] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/fandq/get_faqs`);

        if (Array.isArray(response.data)) {
          // Group FAQs by type
          const groupedFAQs = response.data.reduce((acc, faq) => {
            if (!acc[faq.type]) {
              acc[faq.type] = { title: faq.type, faqs: [] };
            }
            acc[faq.type].faqs.push({ question: faq.question, answer: faq.answer });
            return acc;
          }, {});

          setFaqTopics(Object.values(groupedFAQs)); // Convert grouped object into an array
        } else {
          setFaqTopics([]);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row p-8 bg-gray-100 min-h-screen">
      {/* Left Section - Topics */}
      <div className="w-full md:w-1/3">
        <div className="bg-white p-6 py-10 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Explore Topics</h2>
          <ul className="space-y-2">
            {faqTopics.map((topic, index) => (
              <li key={index} className="cursor-pointer hover:text-orange-500">
                {topic.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-white p-6 rounded-md">
          <h2 className="text-2xl font-semibold">Don't Find Your Answer?</h2>
          <div className="mt-5 flex">
           <Link to={"/contact-us"}>
           <button className="w-40 bg-black text-white px-4 py-2 rounded-lg hover:bg-orange-500">
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - FAQs */}
      <div className="w-full md:w-2/3 md:ml-8 mt-6 md:mt-0">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>

        {faqTopics.length === 0 ? (
          <p className="text-gray-600">No FAQs available.</p>
        ) : (
          faqTopics.map((topic, topicIndex) => (
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
          ))
        )}
      </div>
    </div>
  );
}
