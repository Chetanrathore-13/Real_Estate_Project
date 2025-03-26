import React from 'react'
import Map from './components/About/Map'
import Form from './components/Contact/Form'
import NavbarMine from './components/NavbarMine';
import FooterMine from './components/FooterMine';
import axios from 'axios';
import { useState,useEffect } from 'react';

const Contact = () => {
  const [contact,setContact] = useState(null)
  

  useEffect(() => {
     const fetchContactDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/contactus/get_contacts")
        console.log(response.data[0])
        setContact(response.data[0])
      } catch (error) {
        console.log(error)
      }
     }
     fetchContactDetails()
  },[])


  return (
    <div>
      <NavbarMine/>
      <header className="w-full mt-10 relative">
  <img src="/blogs/ils_07.svg" alt="Blog Header" className="w-full object-cover" />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Contact</h1>
    <p className="text-base sm:text-lg mt-2">
      <span className="underline decoration-black">Home / Contact</span>
    </p>
  </div>
</header>
      <Form  contact={contact}/>
      <div className="p-6 rounded-lg mt-10  text-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#080E51] mb-4">Visit our office</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <img src="/ContactUs/loc.png" alt="Location" className="w-8 h-8 sm:w-10 sm:h-10" />
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">{contact?.fullAddress}</p>
        </div>
      </div>

      <Map contact={contact} />
      
      <FooterMine />
    </div>
  )
}

export default Contact