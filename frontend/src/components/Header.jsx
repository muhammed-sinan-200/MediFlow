import React from 'react'
import { assets } from '../assets/assets.js'
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-purple-700 rounded-xl px-6 md:px-10  lg:px-20'>
      {/* left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-3 py-10 m-auto md:py-[10vw] md:-mb-7.5'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Care you can trust</p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-26' src={assets.group_profiles} alt="" />
          <p>Book your appointment easily and connect with our trusted doctors.</p>
        </div>
        <a className='flex items-center gap-3 bg-white px-8 py-5 rounded-full 
         font-medium  hover:scale-105 transition-all duration-200 m-auto md:m-0 group
         ' href="#speciality">
          Book Appointment <img className='w-4 group-hover:text-purple-700' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side */}
      < div className='md:w-1/2 relative'>
        <img className='w-full md:absolute  bottom-0 h-auto rounded-lg' src={assets.banner1} alt="" />
      </div>
    </div>
  )
}

export default Header