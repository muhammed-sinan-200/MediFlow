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

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <motion.div
      initial={{ y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='max-w-3xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-purple-100 flex flex-col gap-8'
    >
      <div className='flex flex-col items-center'>
        {isEdit ? (
          <label htmlFor='image' className='cursor-pointer'>
            <div className='relative w-36 h-36 rounded-full overflow-hidden border-2 border-purple-200 shadow-md'>
              <img
                className='w-full h-full object-cover'
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <div className='absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-sm'>
                <img
                  className='w-5 h-5'
                  src={assets.upload_icon}
                  alt="Upload"
                />
              </div>
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              hidden
              id='image'
            />
          </label>
        ) : (
          <div className='w-36 h-36 rounded-full overflow-hidden border-2 border-purple-200 shadow-md'>
            <img
              className='w-full h-full object-cover'
              src={userData.image}
              alt="Profile"
            />
          </div>
        )}
      </div>

      <div className='bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-purple-100'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <p className='text-sm font-medium text-gray-500 mb-2'>Name</p>
            {isEdit ? (
              <input
                type='text'
                value={userData.name}
                className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 outline-none focus:border-purple-400'
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800 font-medium'>
                {userData.name}
              </div>
            )}
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500 mb-2'>Email</p>
            <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800 break-all'>
              {userData.email}
            </div>
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500 mb-2'>Phone</p>
            {isEdit ? (
              <input
                type='text'
                value={userData.phone}
                className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 outline-none focus:border-purple-400'
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800'>
                {userData.phone}
              </div>
            )}
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500 mb-2'>Date of Birth</p>
            {isEdit ? (
              <input
                type='date'
                value={userData.dob}
                className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 outline-none focus:border-purple-400'
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800'>
                {userData.dob}
              </div>
            )}
          </div>

          <div className='md:col-span-2'>
            <p className='text-sm font-medium text-gray-500 mb-2'>Address</p>
            {isEdit ? (
              <div className='flex flex-col gap-3'>
                <input
                  type='text'
                  value={userData.address.line1}
                  className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 outline-none focus:border-purple-400'
                  onChange={(e) =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))
                  }
                />
                <input
                  type='text'
                  value={userData.address.line2}
                  className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 outline-none focus:border-purple-400'
                  onChange={(e) =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))
                  }
                />
              </div>
            ) : (
              <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800 leading-6'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </div>
            )}
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500 mb-2'>Gender</p>
            {isEdit ? (
              <select
                className='w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 outline-none focus:border-purple-400'
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender || ""}
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800'>
                {userData.gender}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        {isEdit ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            className='bg-purple-700 px-8 py-3 rounded-full cursor-pointer text-white hover:bg-purple-800 transition-colors'
            onClick={updateProfileData}
          >
            Save Profile
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            className='bg-purple-700 text-white px-8 py-3 rounded-full cursor-pointer hover:bg-purple-800 transition-colors'
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default MyProfile