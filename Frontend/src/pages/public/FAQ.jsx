import React from 'react'
import SearchSection from './components/Blogs/SearchSection'
import QueSec from './components/FAQ/QueSec'
import Navbar from '../../components/Navbar'
import FooterMine from './components/FooterMine';
import NavbarMine from './components/NavbarMine';

const FAQ = () => {
  return (
    <div>
      <NavbarMine/>
          <header className="w-full relative">
  <img src="/blogs/ils_07.svg" alt="Blog Header" className="w-full object-cover" />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4">
    <h1 className="text-5xl font-bold">FAQ's</h1>
    <p className="text-base  mt-4">
      <span className="underline decoration-black">Home / FAQ's</span>
    </p>
  </div>
</header>
        <QueSec/>
       <SearchSection/>
      <FooterMine/>
    </div>
  )
}

export default FAQ
