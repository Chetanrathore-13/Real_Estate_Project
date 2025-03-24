import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function Whyus() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const topics = [
        {
            faqs: [
                {
                    question: "How do I list my property for sale?",
                    answer: "You can list your property by creating an account and filling out the listing form."
                }
            ]
        },
        {
            faqs: [
                {
                    question: "How do I find a rental property?",
                    answer: "You can browse available rentals using filters like price, location, and amenities."
                }
            ]
        },
        {
            faqs: [
                {
                    question: "How do I apply for a home loan?",
                    answer: "You can apply for a home loan by contacting our partnered banks through the platform."
                }
            ]
        }
    ];

    return (
        <section className="py-16 w-full flex flex-col md:flex-row items-start justify-center px-6 md:px-12">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <img
                    src="https://img.freepik.com/free-photo/anime-flat-building-illustration_23-2151151014.jpg?ga=GA1.1.973729675.1687186904&semt=ais_keywords_boost"
                    alt="Dream Home"
                    className="w-11/12 md:w-4/5 lg:w-3/4 h-auto "
                />
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full md:w-1/2 md:text-left flex flex-col justify-start">
                {/* Small Heading */}
                <h4 className="text-3xl font-semibold text-orange-500 uppercase mb-2 self-start">
                    Why Us
                </h4>

                {/* Big Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-4">
                    Find Your Dream Home Easily.
                </h2>

                {/* Black Line */}
                <div className="h-1 bg-black w-16 my-4 mx-auto md:mx-0"></div>

                {/* FAQ Section */}
                <div className="mt-6">
                    {topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="mb-4">
                            {topic.faqs.map((faq, faqIndex) => (
                                <div key={faqIndex} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleFAQ(`${topicIndex}-${faqIndex}`)}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                        {openIndex === `${topicIndex}-${faqIndex}` ? (
                                            <Minus className="w-5 h-5 text-orange-500" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                    {openIndex === `${topicIndex}-${faqIndex}` && (
                                        <p className="mt-2 text-gray-600">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Contact Us Button */}
                <div className="mt-6">
                    <button className="px-6 py-3 text-lg bg-black text-white border border-black rounded-lg hover:bg-orange-600 hover:border-orange-600 transition-all duration-300">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
}
