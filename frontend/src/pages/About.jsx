import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Heart, Image, Sticker } from 'lucide-react'
import { motion } from "framer-motion";

const About = () => {

  const [liked, setLiked] = useState(false)

  const handleLikes = () => {
    setLiked(!liked)
  }
  return (
    <div className='px-6 py-14 sm:px-16'>
      {/*1  */}

      <section className='grid md:grid-cols-2 gap-12 mb-20 items-center text-justify'>
        <motion.div initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}>
          <h1 className='text-4xl font-semibold mb-10 text-center  text-purple-950'>About Us</h1>
          <p className='text-2xl text-purple-900 font-medium'>Care you can trust</p>
          <p className='text-lg font-base text-gray-600 mt-3'>
            Mediflow is a digital healthcare platform that connects patients, hospitals, and
            medical professionals through a simple and reliable system. Designed to reduce
            complexity and build trust, Mediflow makes healthcare more accessible, organized,
            and dependable for everyone.</p>
        </motion.div>
        <motion.img initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          src={assets.Health_team} alt="" className=' rounded-2xl' />
      </section>

      {/* 2 */}

      <section >
        <motion.h2 initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className='text-2xl text-purple-900 font-medium'>Healthcare today is fragmented</motion.h2>
        <motion.p initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className='text-lg font-base text-gray-600 mt-3'>Accessing healthcare can be confusing and time-consuming.
          Mediflow simplifies the experience through a connected and reliable platform.
          Too many steps and too little clarity define modern healthcare.
          Mediflow simplifies the journey with organized, dependable care.</motion.p>
      </section>

      {/* 3 */}

      <section >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className='text-2xl text-purple-900 font-medium mt-12'>
          Empowering Modern Healthcare
        </motion.h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6'>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='border p-5 rounded-2xl'>
            <img src={assets.Hospital_building} alt="" className='mb-4' />
            <h3 className='font-medium mb-2'>High Infrastructure</h3>
            <p className='text-sm text-gray-700'>Modern facilities for top-quality patient care.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className='border p-5 rounded-2xl'>
            <img src={assets.Hospital_bed} alt="" className='mb-4' />
            <h3 className='font-medium mb-2'>Care Continuity</h3>
            <p className='text-sm text-gray-700'> Care across every stage of their healthcare journey.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: true }}
            className='border p-5 rounded-2xl'>
            <img src={assets.CT_scan} alt="" className='mb-4' />
            <h3 className='font-medium mb-2'>Advanced Technology</h3>
            <p className='text-sm text-gray-700'>Smart solutions to improve healthcare efficiency.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            viewport={{ once: true }}
            className='border p-5 rounded-2xl'>
            <img src={assets.Ambulance} alt="" className='mb-4' />
            <h3 className='font-medium mb-2'>24/7 Medical Transport</h3>
            <p className='text-sm text-gray-700'>24/7 to provide emergency medical support.</p>
          </motion.div>

        </div>
      </section>

      {/* 4 */}

      <section className='grid md:grid-cols-2 gap-12 my-24 items-center'>
        <motion.img initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src={assets.Doctors} alt="" className='rounded-2xl' />

        <div>
          <motion.h2 initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl text-purple-900 font-medium mb-4">
            Built with healthcare professionals at the core
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed">
            Mediflow is designed around how doctors, nurses, and medical staff actually work —
            helping them focus on care rather than coordination.
          </motion.p>
        </div>

      </section>

      {/* 5 */}

      <section
        className='grid grid-cols-2 items-center'>
        <div className='py-5 px-6'>
          <motion.h3 initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className='text-2xl text-purple-900 font-medium mb-4'>Be a part of our team by donating
            <span className='animate-pulse ml-2 px-1.5 border border-purple-800 text-sm font-bold text-purple-800 bg-purple-100 rounded-full'>new</span>
          </motion.h3>
          <motion.p initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }} className='text-gray-600 leading-relaxed'> Every drop counts. Join our blood donation program to help patients in need and contribute
            to saving lives in your community.</motion.p>
          <motion.button initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className='px-3 py-1.5 border border-purple-700 mt-4 rounded cursor-pointer
            hover:bg-purple-900 hover:text-white'>Donate</motion.button>
        </div>
        <motion.img initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }} src={assets.Blood_donation} alt="" />
      </section>


      {/* 6 */}

      <section className='mt-10'>
        <motion.div initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='flex items-center'>
          <div className='grow h-px bg-purple-300 '></div>
          <motion.h1 initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='text-3xl p-4 font-medium mb-10 text-center  text-purple-950 mt-7'>
            Our Vision
          </motion.h1>
          <div className='grow h-px bg-purple-300 '></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className='px-4 sm:px-8 md:px-16 lg:px-32  relative border border-gray-300'>
          <Heart onClick={() => handleLikes()} className={`absolute right-1 bottom-1 transition-all duration-300 ease-in-out
              w-10 h-10 cursor-pointer ${liked ? 'text-red-700' : 'text-gray-700'}`}
          />
          <img src={assets.Hospital_family} alt=""
            className='w-full object-contain'
          />
          <motion.p initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className='  absolute top-1/2 left-1/2 
                          -translate-x-1/2 -translate-y-1/2
                          text-center max-w-xl font-medium
                          text-sm sm:text-base md:text-lg
                          bg-white/50 text-gray-900 p-4 sm:p-6 rounded-xl'>
            Our vision is to simplify healthcare through technology that connects people, systems,
            and care making quality healthcare accessible and patient-centric for all.</motion.p>
        </motion.div>
      </section>

    </div>
  )
}

export default About