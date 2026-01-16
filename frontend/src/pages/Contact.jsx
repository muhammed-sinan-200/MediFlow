import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form'

const Contact = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log(data);
    reset()
  }
  return (
    <div className='px-6 py-14'>
      <section className='grid sm:grid-cols-2 gap-10'>
        <motion.div initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
          viewport={{ once: true }}
          className='text-center'>
          <h1 className='text-4xl font-semibold text-center text-purple-900'>Contact Us</h1>
          <p className='text-gray-600 mt-5 text-center text-md'>
            We’re here to help you with appointments and enquiries.
          </p>
          <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className='mt-5 px-6 py-10 rounded-lg shadow-xl bg-purple-50 space-y-8'>
              <div>
                <input
                  type="text"
                  placeholder='Your name'
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                  className={`w-full px-4 py-4 bg-purple-100 rounded-xl text-gray-900
                outline-none ${errors.name ? 'ring-2 ring-red-400 bg-red-50' : 'hover:ring-2 hover:ring-purple-500 focus:ring-2 focus:ring-purple-500 focus:bg-white'} `}
                />
                {errors.name && (
                  <p className='text-red-400 text-xs mt-1'>{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder='Your email'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email"
                    }
                  })}
                  className={`w-full px-4 py-4 bg-purple-100 rounded-xl text-gray-900
                outline-none ${errors.email ? 'ring-2 ring-red-400 bg-red-50' : 'hover:ring-2 hover:ring-purple-500 focus:ring-2 focus:ring-purple-500 focus:bg-white'}`}
                />
                {errors.email && (
                  <p className='text-red-400 text-xs mt-1'>{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder='Your message...'
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                  className={`w-full outline-none  p-4 rounded-xl bg-purple-100 text-gray-700 hover:ring-2 
                ${errors.message ? 'ring-2 ring-red-400 bg-red-50' : 'hover:ring-2 hover:ring-purple-500 focus:ring-2 focus:ring-purple-500 focus:bg-white'}`}
                ></textarea>
                {errors.message && (
                  <p className='text-red-400 text-xs mt-1'>{errors.message.message}</p>
                )}
              </div>

              <button type='submit' className='cursor-pointer  w-full py-2 border rounded-xl border-purple-500
                bg-purple-700 text-white hover:bg-purple-800 hover:text-white transition-colors'>
                Submit
              </button>
            </form>

          </div>
        </motion.div>
        <motion.img initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          src={assets.Contact_us} alt="" className='hidden sm:block object-cover w-full' />
      </section>
    </div>
  )
}

export default Contact