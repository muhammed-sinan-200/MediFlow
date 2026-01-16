import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets.js'

const Header = () => {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(45deg, #5B21B6 0%, #552586 50%, #FFFFFF 100%)'
      }}

      className='flex flex-col md:flex-row flex-wrap  rounded-xl px-6 md:px-10 lg:px-20'
    >
      {/* left side */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        className='md:w-1/2 flex flex-col items-start justify-center gap-3 py-10 m-auto md:py-[10vw] md:-mb-7.5'
      >
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Care you can trust
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-26' src={assets.group_profiles} alt="" />
          <p>Book your appointment easily and connect with our trusted doctors.</p>
        </div>

        <div>
          <a
            className='flex items-center gap-3 bg-white px-8 py-5 rounded-full 
          font-medium hover:scale-105 transition-all duration-200 m-auto md:m-0 group'
            href="#speciality"
          >
            Book Appointment
            <img className='w-4 group-hover:text-purple-700' src={assets.arrow_icon} alt="" />
          </a>
        </div>

      </motion.div>

      {/* right side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        className='md:w-1/2 relative'
      >
        <img
          className='w-full md:absolute bottom-0 h-auto rounded-lg'
          src={assets.banner1}
          alt=""
        />
      </motion.div>
    </motion.div>
  )
}

export default Header
