import React from 'react'
import BackImg from "../../../public/aboutus/bg.jpg";
import CardContainer from "./components/About/CardContainer";
import JoinSec from './components/About/JoinSec';
import Map from './components/About/Map';
import NewSec from './components/About/NewSec';

import FooterMine from './components/FooterMine';
import NavbarMine from './components/NavbarMine';

const Aboutus = () => {
  return (
    <div>
      <NavbarMine />
      {/* Header with background image */}
      <header className="relative w-full h-[800px] overflow-hidden">
        <img src={BackImg} alt="Background" className="w-full h-full object-cover" />

      </header>

      {/* Centered Div - 90% of the page height & overlapping header */}
      <div className="relative bg-[url('/aboutus/bg-2.jpg')] bg-cover bg-center -mt-[100px] flex justify-center">
        <div className="w-[90%] h-[90vh] bg-white   flex flex-col items-center text-center ">


          <div className="w-4/5 text-center  mt-20">
            <h3 className="text-lg font-semibold text-orange-500 mb-1">Welcome to Homeid</h3>
            <h1 className="text-4xl font-semibold mb-2 leading-tight text-[#080E51]">
              We see change as an opportunity, not a threat and start<br />
              with the belief that there is a better way.
            </h1>
            <p className="text-[1.35rem] text-gray-700 mb-4 mt-5 leading-relaxed">
              Over the past 25 years, we’ve created more than 5,000 new homes and 1.5 million sq ft of workspace in over
              60 regeneration projects. Have a look at the short film below to learn more about how we’ve achieved this and what drives us.
            </p>
            <h4 className="text-lg font-semibold mb-3">Jump to</h4>
          </div>


          {/* Buttons Section */}
          <div className="flex flex-wrap justify-center gap-8 mt-5 mb-10">
            <button className="bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded hover:bg-orange-500 hover:text-white transition duration-300">
              Service
            </button>
            <button className="bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded hover:bg-orange-500 hover:text-white transition duration-300">
              Leadership
            </button>
            <button className="bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded hover:bg-orange-500 hover:text-white transition duration-300">
              Office Location
            </button>
            <button className="bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded hover:bg-orange-500 hover:text-white transition duration-300">
              Work with Us
            </button>
          </div>




        </div>
      </div>


      {/* Our Services Section */}
      <section className="py-16 bg-[url('/aboutus/bg-2.jpg')] bg-cover bg-center text-center text-white">
        <h2 className="text-3xl text-[#080E51] font-semibold mb-5 relative z-10">Our Services</h2>
        <div className="w-[60%] mx-auto">
          <p className="text-gray-600 mb-20 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nam consequatur maiores porro animi minima consequuntur culpa.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 px-6 sm:px-12 md:px-20">
          <div className="bg-white w-full  p-6 rounded-lg shadow-lg flex flex-col items-center">

            <img src="https://cdn-icons-png.freepik.com/256/13331/13331805.png?ga=GA1.1.973729675.1687186904&semt=ais_hybrid"
              alt="Service 1" className="w-20  mb-4 mt-12" />
            <h3 className="text-xl text-[#080E51] font-bold mb-2">Property Management</h3>
            <p className="text-gray-600 text-center text-base">We deliver high-quality, sustainable buildings that stand the test of time.</p>
          </div>
          <div className="bg-white w-full max-w-[400px] p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/3190/3190512.png"
              alt="Service 2" className="w-20 h-20 mb-4 mt-12" />
            <h3 className="text-xl text-[#080E51] font-bold mb-2">Mortgage Service</h3>
            <p className="text-gray-600 text-center text-base">Our innovative architectural designs redefine modern living and workspaces.</p>
          </div>
          <div className="bg-white w-full max-w-[400px] h-90 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/3143/3143073.png"
              alt="Service 3" className="w-20 h-20 mb-4 mt-12" />
            <h3 className="text-xl text-[#080E51] font-bold mb-2">Consulting Service</h3>
            <p className="text-gray-600 text-center text-base">We integrate smart technology for efficiency and enhanced living experiences.</p>
          </div>
        </div>


      </section>

      <div className="leader">
        <h1 className="text-4xl text-[#080E51] mt-20 font-semibold mb-5 relative z-10 text-center">Leadership</h1>

        <p className="text-gray-600 mt-7 mb-15 text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est exercitationem quasi maiores iste vero quo,<br /> necessitatibus neque at quis accusamus.</p>
        <CardContainer />
      </div>

      <div className="map">
        <Map />
      </div>

      <div className="text">
        <JoinSec />
      </div>
      <div className="img">
        <NewSec />
      </div>
      <hr />
      <div className='FOOTER'>
        <FooterMine />
      </div>
    </div>
  )
}

export default Aboutus
