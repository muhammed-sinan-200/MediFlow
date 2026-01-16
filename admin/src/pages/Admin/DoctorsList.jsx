import  { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { motion } from 'framer-motion'

const DoctorsList = () => {

  const { aToken, doctors, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    getAllDoctors()
  }, [aToken])

  return (
    <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    className='m-5 max-h-[90vh] overflow-y-scroll  px-4 py-5'>
      <motion.h1 initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      className='mb-3 text-lg font-medium text-purple-950'>All Doctors</motion.h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div className='border border-purple-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className=' group-hover:bg-purple-100 transition-all duration-300' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-lg font-medium'>{item.name}</p>
                <p className='text-sm'>{item.speciality}</p>
                <div className='flex items-center gap-1 mt-2 text-sm' >
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default DoctorsList