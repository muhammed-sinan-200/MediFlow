import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {

      if (!docImg) {
        return toast.error("Image not selected")
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))



      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setpassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    }
  }

  return (
    <motion.form initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className=' m-5 px-4 py-5 w-full' onSubmit={handleSubmit(handleFormSubmit)}>
      <p className='mb-3 text-lg font-medium text-purple-950'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border border-purple-200 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-purple-800'>

          <label htmlFor="doc-img">
            <img className='cursor-pointer w-16 bg-purple-50 rounded-full' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>

          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p>Upload doctor <br /> picture</p>
        </div>


        <div className='flex flex-col lg:flex-row items-start gap-10 text-purple-900'>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be atleast 2 characters"
                }
              })}
                onChange={(e) => setName(e.target.value)} value={name} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="text" placeholder='Name' />
              {errors.name &&
                <p className='text-red-500 text-xs '>{errors.name.message}</p>
              }
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email"
                }
              })}
                onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="email" placeholder='Email' />
              {errors.email &&
                <p className='text-red-500 text-xs'>{errors.email.message}</p>
              }
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input  {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
                onChange={(e) => setpassword(e.target.value)} value={password} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="password" placeholder='Password' />
              {errors.password &&
                <p className='text-red-500 text-xs'>{errors.password.message}</p>
              }
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select {...register("experience")} onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none' name="" id="">
                <option value="1 Years">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div className='flex flex-1 flex-col gap-1'>
              <p>Fees</p>
              <input  {...register("fees", {
                required: "Fees required",
                min: { value: 1, message: "Fees must be positive" }
              })}
                onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="number" placeholder='Fees' />
              {errors.fees &&
                <p className='text-red-500 text-xs'>{errors.fees.message}</p>
              }
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Speciality</p>
              <select {...register("speciality")} onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-1 flex-col gap-1'>
              <p>Education</p>
              <input {...register("degree", { required: "Degree is required" })}
                onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="text" placeholder='Name' />
              {errors.degree &&
                <p className='text-red-500 text-xs'>{errors.degree.message}</p>
              }
            </div>

            <div className='flex flex-1 flex-col gap-1' >
              <p>Address</p>
              <input {...register("address1", { required: "Address required" })}
              onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="text" placeholder='Address 1' />
              {errors.address1 && <p className='text-red-500 text-xs'>{errors.address1.message}</p>}
              <input    {...register("address2")}
              onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none ' type="text" placeholder='Address 2' />
            </div>

          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea {...register("about", {
              required: "About doctor is required",
              minLength: { value: 20, message: "Minimum 20 characters" }
            })}
          onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 py-2 border rounded border-purple-300 focus:ring-1 focus:ring-purple-400 outline-none' placeholder='about doctor..' rows={5} />
           {errors.about && <p className='text-red-500 text-xs'>{errors.about.message}</p>}
        </div>

        <button type='submit' className='rounded-full mt-4 bg-purple-700 px-10 py-3 text-white cursor-pointer hover:bg-purple-800 transition-all'>Add doctor</button>

      </div>
    </motion.form>
  )
}

export default AddDoctor