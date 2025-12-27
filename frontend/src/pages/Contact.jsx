import React from 'react'
import { assets } from '../assets/assets'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

const Contact = () => {
  return (
    <div className='px-6 py-14'>
      <section className='grid sm:grid-cols-2 gap-10'>
        <div className='text-center'>
          <h1 className='text-4xl font-semibold text-center text-purple-900'>Contact Us</h1>
          <p className='text-gray-600 mt-5 text-center text-md'>
            We’re here to help you with appointments and enquiries.
          </p>
          <div>
            <form action="" className='mt-5 px-6 py-10 rounded-lg shadow-2xl bg-purple-100 space-y-8'>
              <input
                type="text"
                placeholder='Your good name'
                className='w-full px-4 py-4 bg-purple-300 rounded-xl text-gray-500
                outline-none hover:ring-2 hover:ring-purple-500 focus:ring-2 focus:ring-purple-500 focus:bg-white' />
              <input
                type="text"
                placeholder='Your email'
                className='w-full px-4 py-4 bg-purple-300 rounded-xl text-gray-500
                outline-none hover:ring-2 hover:ring-purple-500 focus:ring-2 focus:ring-purple-500 focus:bg-white' />
              <textarea
                name=""
                id=""
                placeholder='Your message...'
                className='w-full outline-none  p-4 rounded-xl bg-purple-300 text-gray-500 hover:ring-2 hover:ring-purple-500 focus:ring-2 focus:ring-purple-500 focus:bg-white'
              ></textarea>
              <button className='cursor-pointer  w-full py-2 border rounded-xl border-purple-500
                hover:bg-purple-500 hover:text-white transition-colors'>
                Submit
              </button>
            </form>

          </div>
        </div>
        <img src={assets.Contact_us} alt="" className='hidden sm:block object-cover w-full' />
      </section>

      <section >
        
      </section>
    </div>
  )
}

export default Contact