import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, spring } from 'framer-motion'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);

    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  return profileData && (
    <motion.div initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className='flex flex-col gap-4 m-5'>
        <div className='flex justify-center sm:justify-start'>
          <img
            className='bg-purple-100/80 w-40 h-40 object-cover rounded-xl shadow'
            src={profileData.image}
            alt="Doctor"
          />
        </div>


        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-6 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          {/* name,degree,and experience */}
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <p className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</p>
          </div>
          {/* about */}
          <div>
            <p className='flex items-center gap-1 text-base font-medium text-neutral-700 mt-3'>About:</p>
            <p className='text-gray-700 text-base'>{profileData.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment Fee: <span className='text-gray-800'>&#8377;  
              {isEdit ? <input className='px-1 max-w-52 bg-purple-200  mt-4  font-base border border-purple-400 outline-none rounded text-gray-600' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> :  profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p className='text-base font-medium text-neutral-700'>Address:</p>
            <p className='text-sm font-normal'>
              {isEdit ? <input placeholder='address1'  className='px-1 max-w-52 bg-purple-200  mt-4  font-base border border-purple-400 outline-none rounded text-gray-600' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input placeholder='address2' className='px-1 max-w-52 bg-purple-200  mt-4  font-base border border-purple-400 outline-none rounded text-gray-600' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>

          </div>

          <div className='flex gap-1 pt-2 text-gray-800 font-medium'>
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} type="checkbox" checked={profileData.available} name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit ?
              <button onClick={updateProfile} className='px-6 py-2 border bg-purple-700 text-sm rounded-full mt-5 cursor-pointer hover:bg-purple-800 text-white transition-all'>Save Profile</button>
              :
              <button onClick={() => setIsEdit(true)} className='px-6 py-2 border bg-purple-700 text-sm rounded-full mt-5 cursor-pointer hover:bg-purple-800 text-white transition-all'>Edit</button>
          }
        </div>
      </div>
    </motion.div>
  )
}

export default DoctorProfile