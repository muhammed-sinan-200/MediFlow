import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const TopDoctorsList = () => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    return (
        <div id='doctors' className='flex flex-col items-center gap-4 py-10 mt-20'>
            <motion.h1
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-800 to-indigo-600 sm:text-4xl'
            >
                Our Top Doctors
            </motion.h1>

            <h1
                className='text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r
                from-purple-800 to-indigo-600 sm:text-4xl text-center'
            >
                Expert Care. Trusted Doctors. Exceptional Outcomes.
            </h1>

            <p className='text-gray-600 font-base text-md text-center'>
                Choose your doctor and book consultations with experienced specialists dedicated to your well-being.
            </p>

            <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6'>
                {
                    doctors.slice(0, 8).map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointments/${item._id}`)}
                            key={index}
                            className='border border-purple-300 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-400 hover:-translate-y-2 transition-transform transition-colors duration-300 group'
                        >
                            <img
                                src={item.image}
                                alt=""
                                className='transition-colors duration-300 group-hover:bg-purple-100'
                            />

                            <div className='p-4'>
                                <div className={`flex items-center text-center gap-2 ${item.available ? 'text-green-300' : 'text-gray-300'} text-sm`}>
                                    <p className={`rounded-full ${item.available ? 'bg-green-300' : 'bg-gray-300'} w-2 h-2`}></p>
                                    <p>{item.available ? "Available" : "Not Available"}</p>
                                </div>

                                <p className='text-purple-950 text-lg font-medium'>{item.name}</p>
                                <p className='text-purple-500 text-sm font-semibold'>{item.speciality}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <button
                onClick={() => {
                    navigate('/doctors')
                    scrollTo(0, 0)
                }}
                className="
    inline-flex items-center justify-center
    px-5 py-2.5 mt-8
    rounded-full
    border border-purple-300
    text-white text-sm font-medium
    transition-all duration-200 bg-purple-700
    hover:bg-purple-800 hover:border-purple-400
    active:scale-[0.97] cursor-pointer
  "
            >
                View all doctors
            </button>
        </div>
    )
}

export default TopDoctorsList