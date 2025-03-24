import React from 'react';
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Autoplay } from 'swiper/modules';
import Coreser from './components/Service/Coreser';
import SearchSection from './components/Blogs/SearchSection';
import Whyus from './components/Service/Whyus';
import FooterMine from './components/FooterMine';
import NavbarMine from './components/NavbarMine';

const Services = () => {
    const companies = [
        './Service/company1.png', './Service/company2.png', './Service/company3.png',
        './Service/company4.png', './Service/company5.png', './Service/company1.png',
        './Service/company2.png', './Service/company3.png', './Service/company4.png',
        './Service/company5.png'
    ];

    return (
        <div>
            <NavbarMine />
            <header className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[450px] relative">
                <img
                    src="https://wp1.themevibrant.com/newwp/homy/wp-content/uploads/2024/01/img_49.jpg"
                    alt="Blog Header"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between text-black px-6 sm:px-12 lg:px-20">
                    <div className="text-left max-w-lg">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Services</h1>
                        <p className="text-base sm:text-lg mt-8">
                            <span className="underline decoration-black">Home / Services</span>
                        </p>
                    </div>
                    <div className="max-w-lg mt-2 sm:mt-0">
                        <p className="text-3xl leading-relaxed">
                            Over 745,000 listings, apartments, lots, and plots available now!
                        </p>
                    </div>
                </div>
            </header>

            <div className="container mx-auto min-h-[450px] flex flex-col lg:flex-row justify-between items-start mt-20 rounded-lg gap-12">
                <div className="w-full lg:w-1/2 text-left">
                    <h2 className="text-6xl font-semibold text-gray-800 leading-snug lg:leading-tight xl:leading-[1.2]">
                        1,230+ Companies <br /> Trust by Us.
                    </h2>
                </div>
                <div className="w-full lg:w-1/2 text-left">
                    <p className="text-black font-normal text-3xl leading-relaxed sm:leading-snug tracking-wide sm:tracking-wider mb-6">
                        Your leading real estate advocate, transforming houses into dreams.
                        Trust us to expertly guide you home.
                        745,000 apartments & homes for sale, rent & mortgage.
                    </p>
                    <div className="flex justify-start mt-10 gap-6">
                        <button className="flex items-center justify-center gap-2 w-52 text-white bg-black px-6 py-3 rounded-lg text-lg hover:bg-orange-500 transition">
                            More Details <ArrowRight size={20} />
                        </button>
                        <button className="flex items-center justify-center gap-2 px-8 py-4 text-black rounded-lg text-lg hover:text-orange-500 transition">
                            Request a Call <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Trusted Company Logos Section with Swiper */}
            <section className="py-10  w-full">
                <div className="max-w-7xl mx-auto px-4">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={20}
                        freeMode={true}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        modules={[FreeMode, Autoplay]}
                        className="w-full"
                    >
                        {companies.map((src, index) => (
                            <SwiperSlide key={index} className="flex justify-center">
                                <img src={src} alt={`Company ${index + 1}`} className="h-20 w-auto" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <Coreser />
            <Whyus />
            <SearchSection />
            <FooterMine />
        </div>
    );
};

export default Services;
