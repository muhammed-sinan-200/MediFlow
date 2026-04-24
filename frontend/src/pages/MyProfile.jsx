import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets.js'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [originalData, setOriginalData] = useState(null)

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
  const handleCancel = () => {
  setUserData(originalData) // restore old data
  setImage(false)
  setIsEdit(false)
}

  return userData && (
    <motion.div
      initial={{ y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-purple-100 flex flex-col gap-6 sm:gap-8'
    >
      <div className='flex flex-col gap-6 sm:gap-8'>
        <div className='flex justify-end'>
          {isEdit ? (
  <div className='flex gap-2'>
    <motion.button
      whileTap={{ scale: 0.97 }}
      className='px-5 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition'
      onClick={handleCancel}
    >
      Cancel
    </motion.button>

    <motion.button
      whileTap={{ scale: 0.97 }}
      className='px-5 py-2 rounded-lg text-sm font-medium text-purple-700 border border-purple-200 hover:bg-purple-50 transition'
      onClick={updateProfileData}
    >
      Save
    </motion.button>
  </div>
) : (
  <motion.button
    whileTap={{ scale: 0.97 }}
    className='px-5 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition'
    onClick={() => {
      setOriginalData(userData)
      setIsEdit(true)
    }}
  >
    Edit
  </motion.button>
)}
        </div>

        <div className='flex justify-center'>
          {isEdit ? (
            <label htmlFor='image' className='cursor-pointer'>
              <div className='relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36'>
                <div className='w-full h-full rounded-full overflow-hidden border-2 border-purple-200 shadow-md'>
                  <img
                    className='w-full h-full object-cover'
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                </div>

                <div className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-600 shadow-md flex items-center justify-center border-2 border-white'>
                  <Pencil size={16} className='text-white sm:w-[18px] sm:h-[18px]' />
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
            <div className='w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-purple-200 shadow-md'>
              <img
                className='w-full h-full object-cover'
                src={userData.image}
                alt="Profile"
              />
            </div>
          )}
        </div>

        <div className='bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 shadow-sm border border-purple-100'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5'>
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
                <div className='px-4 py-3 rounded-xl bg-purple-50 text-gray-800 leading-6 break-words'>
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
      </div>
    </motion.div>
  )
}

export default MyProfile