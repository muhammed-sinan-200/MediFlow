import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets.js'
import { motion } from 'framer-motion'
const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  return (
    <motion.div initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className=' w-full max-w-6xl m-5 px-4 py-5'>
      <p className='mb-3 text-lg font-medium text-purple-950'>All Appointments</p>
      <div className='bg-white shadow-lg rounded-2xl text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-b-purple-400 text-purple-900 font-medium'>
          <p>#</p>
          <p>Patient Name</p>
          <p>Gender</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {
        [...appointments].reverse().map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-purple-700 py-3 px-6 border-b hover:bg-gray-100 ' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-3 '>
              <img className='w-10 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{item.userData?.gender && item.userData.gender !== "Not selected" ? item.userData.gender : "--"}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <div className='flex items-center gap-3 '>
              <img className='w-10 rounded-full bg-purple-200' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
            </div>
            <p>&#8377; {item.amount}</p>
            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isComplete
                  ? <p className='text-green-600 text-xs font-medium'>Completed</p>
                  :
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AllAppointments