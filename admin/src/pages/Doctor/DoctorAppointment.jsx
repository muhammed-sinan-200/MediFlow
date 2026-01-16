import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)


  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])
  return (
    <motion.div initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='w-full max-w-6xl m-5 px-4 py-5'>
      <p className='mb-3 text-lg font-medium text-purple-950'>All Appointments</p>
      <div className='bg-white shadow-lg rounded-2xl text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='text-purple-900 max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-purple-400 font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Gender</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          [...appointments].reverse().map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-purple-700 py-3 px-6 border-b hover:bg-gray-100' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-10 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-purple-400 px-2 rounded-full'>{item.payment ? 'Online' : 'Cash'}</p>
              </div>
              <p>{item.userData.gender}</p>
              <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
              <p>{item.amount}</p>
              {item.cancelled ?
                <p>Cancelled</p>
                : item.isComplete ?
                  <p>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }

            </div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default DoctorAppointment