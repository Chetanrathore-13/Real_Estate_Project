import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import image5 from '../assets/Images/image7.jpg'
import image6 from '../assets/Images/image6.jpg'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ImageCarousal() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='w-full h-full' src={image5} alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-full h-full' src={image6} alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-full h-full' src={image5} alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-full h-full' src={image6} alt="" /></SwiperSlide>
        
      </Swiper>
    </>
  );
}

