import React from 'react'
import EmployeeList from './components/Agent/EmployeeList'
import FooterMine from './components/FooterMine'
import NavbarMine from './components/NavbarMine'

const Agent = () => {
    return (
        <div>
            <NavbarMine />
            <header className="w-full relative h-[400px]  p-4 bg-gray-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#080E51] text-center px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold max-w-xs sm:max-w-md md:max-w-lg">
                        Agent
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg mt-7">
                        <span className="underline decoration-black">Home / Agent</span>
                    </p>
                </div>
            </header>
            <EmployeeList/>
            <FooterMine/>
        </div>

        
    )
}

export default Agent
