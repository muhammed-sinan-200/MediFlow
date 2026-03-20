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
        background: 'linear-gradient(180deg, #5B21B6 0%, #552586 50%, #FFFFFF 100%)'
      }}
      className='flex flex-col md:flex-row rounded-xl px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-8 sm:py-10 md:py-[10vw] md:-mb-7.5'
      >
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-3xl sm:text-4xl text-white font-semibold leading-tight'>
            CARE YOU CAN TRUST
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-lg sm:text-xl md:text-2xl text-purple-100 font-medium leading-snug'
          >
            Your perfect health partner
          </motion.p>
        </div>

        <div className='flex items-start sm:items-center gap-3 text-white text-sm sm:text-base font-light text-left max-w-md'>
          <img
            className='w-16 sm:w-20 md:w-26 flex-shrink-0'
            src={assets.group_profiles}
            alt="Trusted doctors"
          />
          <p className='leading-6'>
            Book your appointment easily and connect with our trusted doctors.
          </p>
        </div>

        <div className='w-full sm:w-auto'>
          <a
            href="#speciality"
            className='inline-flex items-center justify-center gap-3 bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:scale-105 transition-all duration-200 group text-sm sm:text-base'
          >
            Book Appointment
            <img
              className='w-4'
              src={assets.arrow_icon}
              alt="Arrow icon"
            />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        className='md:w-1/2 relative flex justify-center items-end mt-2 md:mt-0'
      >
        <img
          className='w-full max-w-[320px] sm:max-w-[420px] md:max-w-full h-auto object-contain md:absolute md:bottom-0 rounded-lg'
          src={assets.banner1}
          alt="Header banner"
        />
      </motion.div>
    </motion.div>
  )
}

export default Header