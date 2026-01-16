import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets.js'
import { HandHeart, UserRoundCheck, NotebookPen } from 'lucide-react'
import { motion } from 'framer-motion'


const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])
  return dashData && (
    <motion.div initial={{ opacity: 0, x: 70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='m-5 space-y-8'>
      <div>
        <motion.p initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }} className="text-purple-800 rounded-full border w-fit px-2 mt-2">Overview of Mediflow statistics</motion.p>
      </div>

      {/* cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className='flex items-center gap-4 p-8 min-w-72 rounded-2xl bg-white border border-purple-200 shadow-md
    cursor-pointer transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl'>
          <HandHeart size={28} className="text-purple-600" />
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.doctors}</p>
            <p className='text-xl font-medium text-gray-600'>Doctors</p>
            <p className="text-sm text-gray-400 mt-1"> Registered doctors in the system</p>
          </div>
        </div>
        <div className='flex items-center gap-4 p-8 min-w-72 rounded-2xl bg-white border border-purple-200 shadow-md
    cursor-pointer transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl'>
          <UserRoundCheck size={28} className="text-purple-600" />
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-xl font-medium text-gray-600'>Patients</p>
            <p className="text-sm text-gray-400 mt-1"> Registered patients on the platform
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4 p-8 min-w-72 rounded-2xl bg-white border border-purple-200 shadow-md
    cursor-pointer transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl'>
          <NotebookPen size={28} className="text-purple-600" />
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-xl font-medium text-gray-600'>Appointments</p>
            <p className="text-sm text-gray-400 mt-1"> Total appointments scheduled</p>
          </div>
        </div>


      </div>
    </motion.div>
  )
}

export default Dashboard