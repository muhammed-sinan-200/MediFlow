import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets.js'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'


const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadProfileData } = useContext(AppContext)


  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  return userData && (
    <motion.div initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='max-w-2xl mx-auto bg-white/60 backdrop-blur-md 
                rounded-2xl p-8 shadow-xl border border-purple-200 
                flex flex-col  gap-6 text-sm'>
      <div className='flex flex-col items-center'>
        {
          isEdit
            ? <label htmlFor='image'>
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden id='image' />
            </label>

            : <img className='w-36 rounded-full shadow-2xl shadow-purple-300' src={userData.image} alt="" />
        }



        {

          isEdit ?
            <input type='text' value={userData.name} className='px-2 bg-purple-100 max-w-60 mt-4 text-2xl font-base border border-purple-400 outline-none rounded text-black-600'
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
            :

            <p className='font-medium text-2xl text-black mt-4'>{userData.name}</p>

        }
      </div>

      <div className=' bg-white/60 backdrop-blur-md 
                rounded-2xl p-8 shadow-md border border-purple-100 
                flex flex-col  gap-6 text-sm'>
        <p className='text-neutral-600 text-lg mt-3'>
          Contact information
        </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-black text-base'>
          <p className='font-medium'>Email ID:</p>
          <p className='text-purple-900'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {

            isEdit ?
              <input type='text' value={userData.phone} className='px-1 max-w-52 bg-purple-100  mt-4  font-base border border-purple-400 outline-none rounded text-black'
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              :
              <p className='text-purple-900'>{userData.phone}</p>

          }
          <p className='font-medium'>Address:</p>
          {

            isEdit ?
              <p>
                <input onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  type="text" value={userData.address.line1} className='px-1 max-w-52 bg-purple-200  mt-4  font-base border border-purple-400 outline-none rounded text-gray-600'
                />
                <br />
                <input onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  type="text" value={userData.address.line2} className='px-1 max-w-52 bg-purple-200  mt-4  font-base border border-purple-400 outline-none rounded text-gray-600'
                />
              </p>
              :
              <p className='text-purple-900'>{userData.address.line1} <br />
                {userData.address.line2}
              </p>

          }
        </div>

      </div>

      <div className=' bg-white/60 backdrop-blur-md 
                rounded-2xl p-8 shadow-md border border-purple-100 
                flex flex-col gap-6 text-sm'>
        <p className='text-neutral-600 text-lg mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-black text-base'>
          <p className='font-medium'>Gender:</p>
          {

            isEdit ?
              <select className='max-w-20 bg-purple-200' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender || ""}>
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-purple-900'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>

          {

            isEdit ?
              <input className='max-w-28' type="date" value={userData.dob}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              :
              <p className='text-purple-900'>{userData.dob}</p>

          }

        </div>
      </div>
      <div className='mt-3'>
        {

          isEdit ?
            <motion.button whileTap={{ scale: 0.90 }}
              className='border bg-purple-600 px-8 py-2 rounded-full cursor-pointer text-white hover:bg-purple-800 transition-all'
              onClick={updateProfileData}>Save profile</motion.button>
            :
            <motion.button whileTap={{ scale: 0.95 }}
              className='border bg-purple-600 text-white px-8 py-2 rounded-full cursor-pointer hover:bg-purple-800  transition-all'
              onClick={() => setIsEdit(true)}>Edit Profile</motion.button>

        }
      </div>
    </motion.div>

  )
}

export default MyProfile